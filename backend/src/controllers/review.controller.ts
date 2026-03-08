import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { currentUser, getBody } from "../decorators";
import { CreateReviewInput, ListReviewsInput } from "../dto/review.dto";
import { IReviewService } from "../interfaces";

export class ReviewController {
  constructor(private reviewService: IReviewService) {}

  public canRateFreelancer = async (
    req: Request<{ freelancerId: string }>,
    res: Response,
  ): Promise<void> => {
    const user = currentUser(req);

    const result = await this.reviewService.canRateFreelancer(
      user.id,
      req.params.freelancerId,
    );

    res.status(StatusCodes.OK).json(result);
  };

  public createReview = async (req: Request, res: Response): Promise<void> => {
    const user = currentUser(req);
    const body = getBody(req) as CreateReviewInput;

    const result = await this.reviewService.createReview(user.id, body);

    res.status(StatusCodes.CREATED).json(result);
  };

  public listFreelancerReviews = async (
    req: Request<{ freelancerId: string }>,
    res: Response,
  ): Promise<void> => {
    const query = (getBody(req) ?? {}) as ListReviewsInput;

    const result = await this.reviewService.listFreelancerReviews(
      req.params.freelancerId,
      query,
    );

    res.status(StatusCodes.OK).json(result);
  };
}
