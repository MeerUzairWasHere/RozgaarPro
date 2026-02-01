import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import * as Sentry from "@sentry/node";

export const httpExceptionFilter = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Log detailed errors in development mode
  if (process.env.NODE_ENV === "development") {
    console.error("Error Stack:", err.stack);
    console.error("Error Details:", err);
  }

  // ✅ Capture ALL unhandled server errors
  Sentry.captureException(err, {
    tags: { layer: "http" },
    extra: {
      path: req.originalUrl,
      method: req.method,
    },
  });

  const statusCode =
    err.statusCode && err.statusCode < 500
      ? err.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR;

  const message =
    statusCode === StatusCodes.INTERNAL_SERVER_ERROR
      ? "Internal server error"
      : err.message;

  return res.status(statusCode).json({ msg: message });
};
