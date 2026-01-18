import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export const jwtExceptionFilter = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "Token expired. Please login again.",
    });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "Invalid token. Please login again.",
    });
  }

  next(err);
};
