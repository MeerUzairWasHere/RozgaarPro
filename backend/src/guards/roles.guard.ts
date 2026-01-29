import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import { ForbiddenError, UnauthenticatedError } from "../errors";

export const rolesGuard = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthenticatedError("User is not authenticated"));
    }

    if (req.user.role === Role.SUPER_ADMIN) {
      return next();
    }

    const userRole = req.user.role as Role;

    if (!allowedRoles.includes(userRole)) {
      return next(
        new ForbiddenError(
          `Access denied. Required roles: ${allowedRoles.join(", ")}`,
        ),
      );
    }

    next();
  };
};
