import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const notFoundFilter = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    msg: `Route ${req.originalUrl} not found`,
  });
};
