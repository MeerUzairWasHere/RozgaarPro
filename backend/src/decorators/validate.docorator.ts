import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { BadRequestError } from "../errors";

type ValidationSchemas = {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
};

export const validate =
  (schemas: ValidationSchemas) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate body
      if (schemas.body) {

        if (!req.body || Object.keys(req.body).length === 0) {
          throw new BadRequestError("Please provide a valid request body");
        }

        req.body = await schemas.body.parseAsync(req.body);
      }

      // Validate params
      if (schemas.params) {
        const parsedParams = await schemas.params.parseAsync(req.params);
        req.params = parsedParams as typeof req.params;
      }

      // Validate query
      if (schemas.query) {
        const parsedQuery = await schemas.query.parseAsync(req.query);
        req.query = parsedQuery as typeof req.query;
      }

      next();
    } catch (err) {
      next(err);
    }
  };
