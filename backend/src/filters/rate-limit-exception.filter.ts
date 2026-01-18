import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const rateLimitExceptionFilter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    err?.statusCode === StatusCodes.TOO_MANY_REQUESTS ||
    err?.status === StatusCodes.TOO_MANY_REQUESTS ||
    err?.type === "rate-limit"
  ) {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      msg: err.message || "Too many requests. Please try again later.",
      retryAfter: err.retryAfter || "Please try again later",
    });
  }

  next(err);
};
