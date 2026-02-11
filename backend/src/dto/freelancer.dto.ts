import { FreelancerStatus } from "@prisma/client";

import { z } from "zod";
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
}

export interface NearbyFreelancerDetail extends NearbyFreelancer {
  latitude: number;
  longitude: number;
  location: string;
  description: string | null;
}
