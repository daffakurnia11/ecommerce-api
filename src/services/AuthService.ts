import { v7 as uuidv7 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  AuthenticationError,
  BadRequestError,
  InternalServerError,
} from "../middlewares/errorHandler";
import { Users } from "../models/User";
import { UserDetails } from "../models/UserDetail";
import UserRepository from "../repositories/UserRepository";
import UserDetailRepository from "../repositories/UserDetailRepository";
import passport from "passport";
import { jwtConfig } from "../config/jwt";
import { NextFunction, Request, Response } from "express";
import { AUTH_MESSAGE } from "../utils/message";

class AuthService {
  private saltRounds = 10;

  async get(id: string): Promise<Users & UserDetails> {
    const user = await UserRepository.get(id);
    const detail = await UserDetailRepository.get(user.id);

    return { ...user, ...detail } as Users & UserDetails;
  }

  async register(data: Users & UserDetails): Promise<Users & UserDetails> {
    const emailExist = await UserRepository.filter("email", data.email);

    if (emailExist) throw new BadRequestError(AUTH_MESSAGE.EMAIL_EXIST);

    const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);
    data.password = hashedPassword;

    const id = uuidv7();

    await UserRepository.create({
      id,
      email: data.email,
      password: data.password,
    } as Users);

    await UserDetailRepository.create({
      id: uuidv7(),
      user_id: id,
      first_name: data.first_name,
      last_name: data.last_name,
      address: data.address,
      gender: data.gender,
      phone_code: data.phone_code,
      phone_number: data.phone_number,
    } as UserDetails);

    return this.get(id);
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "local",
        { session: false },
        async (
          err: { message: string },
          user: Users & UserDetails,
          info: { message: string }
        ) => {
          try {
            if (err) {
              return reject(new InternalServerError(err.message));
            }
            if (!user) {
              return reject(new AuthenticationError(info.message));
            }

            const { access_token, refresh_token } = await this.generateToken(
              user
            );
            resolve({ access_token, refresh_token });
          } catch (error) {
            reject(error);
          }
        }
      )(req, res, next);
    });
  }

  async generateToken(user: Users & UserDetails) {
    const accessToken = jwt.sign(user, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    const refreshToken = jwt.sign(user, jwtConfig.refreshSecret, {
      expiresIn: jwtConfig.refreshExpiresIn,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async regenerateToken(token: string) {
    const decode: any = jwt.decode(token);

    if (new Date(decode.exp * 1000) < new Date())
      throw new BadRequestError(AUTH_MESSAGE.EXPIRED_TOKEN);

    const user = await this.get(decode.id);

    return await this.generateToken(user);
  }
}

export default new AuthService();
