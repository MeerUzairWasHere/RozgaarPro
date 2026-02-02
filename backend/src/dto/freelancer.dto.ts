import {
  Freelancer,
  FreelancerLocation,
  FreelancerStatus,
} from "@prisma/client";
import { validateGetSingleVisibleFreelancerDetailInput } from "../validators";
import { z } from "zod";

export type FreelancerProfileCompletedInput = {
  professionId: string;
  skillIds: string[]; // max 3 (enforced)
  experience: Freelancer["experience"];
  location: {
    latitude: FreelancerLocation["latitude"];
    longitude: FreelancerLocation["longitude"];
    accuracy: FreelancerLocation["accuracy"];
  };
};

export type FreelancerWithAwayDistanceInput = {
  freelancerId: string;
  latitude: FreelancerLocation["latitude"];
  longitude: FreelancerLocation["longitude"];
};

export interface NearbyFreelancer {
  freelancer_id: string;
  user_id: string;
  primary_profession_name: string;
  name: string;
  experience: number;
  status: FreelancerStatus;
  rating: number;
  distance_km: number;
}

export interface NearbyFreelancerDetail extends NearbyFreelancer {}
