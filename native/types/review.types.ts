import { PaginatedResponse } from "./list.types";

export interface Review {
  id: string;
  user_id: string;
  reviewer_name: string;
  reviewer_profile_image_key: string | null;
  reviewer_profile_image_url: string | null;
  freelancer_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface CanRateFreelancerResponse {
  canRate: boolean;
  hasReviewed: boolean;
  reason: string | null;
}

export interface CreateReviewInput {
  freelancerId: string;
  rating: number;
  comment?: string;
}

export type FreelancerReviewsResponse = PaginatedResponse<Review>;
