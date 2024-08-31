import { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGE } from "../utils/message";

export class BadRequestError extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message || ERROR_MESSAGE.BAD_REQUEST);
    this.statusCode = 400;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class AuthenticationError extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message || ERROR_MESSAGE.AUTHENTICATION_ERROR);
    this.statusCode = 401;
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class ForbiddenError extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message || ERROR_MESSAGE.FORBIDDEN);
    this.statusCode = 403;
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class NotFoundError extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message || ERROR_MESSAGE.NOT_FOUND);
    this.statusCode = 404;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class InternalServerError extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
    this.statusCode = 500;
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export class ServiceUnavailableError extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message || ERROR_MESSAGE.SERVICE_UNAVAILABLE);
    this.statusCode = 503;
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
  }
}

export const errorHandler = (
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  console.error(err); // Debug errors

  const statusCode = err.statusCode || 500;
  const message = err.message || "Error";

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    error: err.data,
  });
};
