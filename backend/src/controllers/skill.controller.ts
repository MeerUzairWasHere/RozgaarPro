import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { ISkillService } from "../interfaces";

export class SkillController {
  constructor(private skillService: ISkillService) {}

  public getAllSkills = async (req: Request, res: Response): Promise<void> => {
    const skills = await this.skillService.getAllAvailableSkills();
    res.status(StatusCodes.OK).json(skills);
  };
}
