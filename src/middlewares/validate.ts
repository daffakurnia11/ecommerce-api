import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next({
      message: errors.array()[0].msg,
      statusCode: 400,
    });
  }
  next();
};
