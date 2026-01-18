import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export const zodExceptionFilter = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Validation failed",
      errors,
    });
  }

  next(err);
};
