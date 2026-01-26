import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { IProfessionService } from "../interfaces";

export class ProfessionController {
  constructor(private professionService: IProfessionService) {}

  public getAllProfessions = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const skills = await this.professionService.getAllAvailableProfessions();
    res.status(StatusCodes.OK).json(skills);
  };

  public getSingleProfession = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const skills = await this.professionService.getSingleProfession({
      professionId: req.params.professionId,
    });
    res.status(StatusCodes.OK).json(skills);
  };

  public getProfessionsFilterList = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const skills = await this.professionService.getProfessionsFilterList();
    res.status(StatusCodes.OK).json(skills);
  };
}
