import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { AuthenticationError } from "./errorHandler";

const auth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: any) => {
      if (err) return next(err);
      if (!user) return next(new AuthenticationError());

      req.user = user;
      next();
    }
  )(req, res, next);
};

export default auth;
