import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";
import * as Sentry from "@sentry/node";

export const prismaExceptionFilter = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = "Database error";

    switch (err.code) {
      case "P2002":
        statusCode = StatusCodes.CONFLICT;
        message = "Duplicate record already exists";
        break;

      case "P2025":
        statusCode = StatusCodes.NOT_FOUND;
        message = "Record not found";
        break;

      case "P2003":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Invalid foreign key reference";
        break;
    }

    // ✅ Log Prisma errors to Sentry
    Sentry.captureException(err, {
      tags: { layer: "prisma", code: err.code },
    });

    if (process.env.NODE_ENV === "development") {
      console.error("Error Stack:", err.stack);
      console.error("Error Details:", err);
    }

    return res.status(statusCode).json({ msg: message });
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Invalid database input",
    });
  }

  next(err);
};
