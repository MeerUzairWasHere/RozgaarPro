import { z } from "zod";
import {
  validateCreateReviewInput,
  validateListReviewsInput,
} from "../validators/review.validator";

export type CreateReviewInput = z.infer<typeof validateCreateReviewInput>;
export type ListReviewsInput = z.infer<typeof validateListReviewsInput>;

export interface ReviewDto {
  id: string;
  user_id: string;
  reviewer_name: string;
  reviewer_profile_image_key: string | null;
  reviewer_profile_image_url: string | null;
  freelancer_id: string;
  rating: number;
  comment: string | null;
  created_at: Date;
}

export interface CanRateFreelancerDto {
  canRate: boolean;
  hasReviewed: boolean;
  reason: string | null;
}

export interface CreateReviewResponseDto {
  id: string;
  freelancerId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
}
