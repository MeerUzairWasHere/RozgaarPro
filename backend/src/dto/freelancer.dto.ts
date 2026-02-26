import { z } from "zod";
import { AvailabilityStatus, FreelancerStatus } from "@prisma/client";
import { validateFreelancerProfileCompletedInput } from "../validators";

export type FreelancerProfileCompletedInput = z.infer<
  typeof validateFreelancerProfileCompletedInput
>;

export interface NearbyFreelancer {
  freelancer_id: string;
  user_id: string;
  primary_profession_name: string;
  primary_profession_id: string;
  name: string;
  experience: number;
  status: FreelancerStatus;
  rating: number;
  distance_km: number;
  profile_image_key: string | null;
  profile_image_url: string | null;
  id_image_key: string | null;
  id_image_url: string | null;
}

export interface FreelancerImage {
  image_id: string;
  freelancer_id: string;
  image_key: string;
  alt_text?: string;
  created_at: Date;
}
export interface NearbyFreelancerDetail extends NearbyFreelancer {
  latitude: number;
  longitude: number;
  phone: string;
  location: string;
  description: string | null;
  availability: AvailabilityStatus;
}
