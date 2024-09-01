import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";
import { AUTH_MESSAGE } from "../utils/message";
import { BadRequestError } from "../middlewares/errorHandler";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.register(req.body);
      res.created(AUTH_MESSAGE.REGISTERED, data);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { access_token, refresh_token } = await AuthService.login(
        req,
        res,
        next
      );
      res.success(AUTH_MESSAGE.LOGIN, { token: access_token }, refresh_token);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.headers["refresh-token"] as string;

      if (!refreshToken) throw new BadRequestError(AUTH_MESSAGE.NO_TOKEN);

      const { access_token, refresh_token } = await AuthService.regenerateToken(
        refreshToken
      );
      res.success(AUTH_MESSAGE.REFRESHED, access_token, refresh_token);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
