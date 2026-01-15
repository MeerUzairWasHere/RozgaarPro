import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "../errors";
import { isTokenValid } from "../utils";

export const authGuard = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  console.log({ authHeader });

  if (!authHeader?.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = isTokenValid(token);
    req.user = payload.user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Access token expired");
  }
};
