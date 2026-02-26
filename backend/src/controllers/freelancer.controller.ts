import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { IFreelancerService } from "../interfaces";
import { currentUser, getBody } from "../decorators";
import { BadRequestError } from "../errors";
import { FreelancerUploadFiles } from "../types";
import { FilterOperator } from "../dto";

export class FreelancerController {
  constructor(private freelancerService: IFreelancerService) {}

  public completeFreelancerProfile = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const id = currentUser(req).id;

    // @ts-ignore
    if (!req.files?.idImage) {
      throw new BadRequestError("idImage is required");
    }

    await this.freelancerService.createAndCompleteFreelancerProfile({
      id,
      params: req.body,
      files: req.files as FreelancerUploadFiles,
    });

    res.status(StatusCodes.OK).json({
      msg: "Profile completed successfully!",
    });
  };

  public getAllVisibleFreelancers = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const result = await this.freelancerService.getAllVisibleFreelancers(
      getBody(req),
    );
    res.status(StatusCodes.OK).json(result);
  };

  public getFreelancerStatus = async (
    req: Request<{ freelancerId: string }>,
    res: Response,
  ): Promise<void> => {
    const { freelancerId } = req.params;
    const status =
      await this.freelancerService.getFreelancerStatus(freelancerId);

    res.status(StatusCodes.OK).json(status);
  };

  public getSingleVisibleFreelancerDetail = async (
    req: Request<{ freelancerId: string }>,
    res: Response,
  ): Promise<void> => {
    const freelancer =
      await this.freelancerService.getSingleVisibleFreelancerDetail(
        req.body.location,
        req.params.freelancerId,
      );

    res.status(StatusCodes.OK).json(freelancer);
  };

  public addGalleryImages = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { freelancerId } = req.params;
    // @ts-ignore
    if (!req.files?.images) {
      throw new BadRequestError("images is required");
    }

    await this.freelancerService.addImagesToFreelancerProfile({
      freelancerId,
      files: req.files as FreelancerUploadFiles,
    });

    res.status(StatusCodes.OK).json({
      msg: "Images added successfully!",
    });
  };

  public getGalleryImages = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { freelancerId } = req.params;

    let query = getBody(req);

    query.filters = [
      ...(query.filters ?? []),
      {
        field: "freelancerId",
        operator: FilterOperator.EQUAL_TO,
        value: freelancerId,
      },
    ];

    const result = await this.freelancerService.getGalleryImages(query);

    res.status(StatusCodes.OK).json(result);
  };
}
