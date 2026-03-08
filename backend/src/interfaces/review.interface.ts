import {
  CanRateFreelancerDto,
  CreateReviewInput,
  CreateReviewResponseDto,
  ListReviewsInput,
  ReviewDto,
} from "../dto/review.dto";
import { PaginatedResponse } from "../types";

export interface IReviewService {
  canRateFreelancer(
    userId: string,
    freelancerId: string,
  ): Promise<CanRateFreelancerDto>;

  createReview(
    userId: string,
    payload: CreateReviewInput,
  ): Promise<CreateReviewResponseDto>;

  listFreelancerReviews(
    freelancerId: string,
    query: ListReviewsInput,
  ): Promise<PaginatedResponse<ReviewDto>>;
}
