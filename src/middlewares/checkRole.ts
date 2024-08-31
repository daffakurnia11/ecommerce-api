import { Request, Response, NextFunction } from "express";
import { AuthenticationError, ForbiddenError } from "./errorHandler";

function checkRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new AuthenticationError();

    const userRole = (req.user as any).role;

    if (!roles.includes(userRole)) throw new ForbiddenError();

    next();
  };
}

export default checkRole;
