import { Request } from "express";
import { ListQueryDto } from "../dto";

export const getBody = (req: Request) => {
  const body: ListQueryDto = req.body ?? {};
  return body;
};
