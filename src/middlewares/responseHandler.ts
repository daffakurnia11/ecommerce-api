import { Request, Response, NextFunction } from "express";
import { Meta } from "../types/pagination";

declare global {
  namespace Express {
    interface Response {
      success: (message: string, data?: any, refresh_token?: string) => void;
      paginated: (message: string, data?: any, meta?: Meta) => void;
      created: (message: string, data?: any) => void;
    }
  }
}

export const responseHandler = (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  res.success = (
    message: string = "Success",
    data: any,
    refresh_token?: string
  ) => {
    res.setHeader("Refresh-Token", refresh_token || "");
    res.setHeader("Access-Control-Expose-Headers", "Refresh-Token");
    res.json({
      success: true,
      status: res.statusCode,
      message,
      data,
    });
  };

  res.paginated = (message: string = "Success", data: any, meta: any) => {
    res.json({
      success: true,
      status: res.statusCode,
      message,
      meta,
      data,
    });
  };

  res.created = (message: string = "Created", data: any) => {
    res.status(201).json({
      success: true,
      status: res.statusCode,
      message,
      data,
    });
  };

  next();
};
