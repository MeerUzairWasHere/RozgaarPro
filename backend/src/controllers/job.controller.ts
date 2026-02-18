import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { IJobService } from "../interfaces";
import { currentUser } from "../decorators";

export class JobController {
  constructor(private jobService: IJobService) {}

  public createJob = async (req: Request, res: Response): Promise<void> => {
    const userId = currentUser(req).id;
    const { freelancerId } = req.params;

    const job = await this.jobService.createJob({
      params: req.body,
      userId,
      freelancerId,
    });

    res.status(StatusCodes.OK).json(job);
  };
}
