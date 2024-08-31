import passport from "passport";
import { IVerifyOptions, Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import { jwtConfig } from "./jwt";
import { AuthenticationError } from "../middlewares/errorHandler";
import UserRepository from "../repositories/UserRepository";
import AuthService from "../services/AuthService";
import { AUTH_MESSAGE } from "../utils/message";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (
      email: string,
      password: string,
      done: (
        error: any,
        user?: Express.User | false,
        options?: IVerifyOptions
      ) => void
    ) => {
      try {
        const user = await UserRepository.filter("email", email);
        
        if (!user) return done(null, false, { message: AUTH_MESSAGE.INVALID_CREDENTIALS });
        
        const data = await AuthService.get(user.id);
        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid)
          return done(null, false, { message: AUTH_MESSAGE.INVALID_CREDENTIALS });

        delete (user as any).password;

        return done(null, data);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
    },
    async (jwtPayload, done) => {
      try {
        const user = await AuthService.get(jwtPayload.id);

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(
          new AuthenticationError("Failed to authenticate token"),
          false
        );
      }
    }
  )
);

export default passport;
