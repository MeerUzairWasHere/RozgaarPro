import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { IFreelancerService, IUserService } from "../interfaces";
import { currentUser } from "../decorators";

export class FreelancerController {
  constructor(
    private freelancerService: IFreelancerService,
    private userService: IUserService,
  ) {}

  public completeFreelancerProfile = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const id = currentUser(req).id;

    await this.freelancerService.createAndCompleteFreelancerProfile({
      id,
      params: req.body,
    });

    res.status(StatusCodes.OK).json({
      msg: "Profile completed successfully!",
    });
  };
}
