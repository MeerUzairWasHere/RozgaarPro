import {
  Freelancer,
  FreelancerLocation,
  FreelancerStatus,
} from "@prisma/client";

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

export type NearbyFreelancer = {
  freelancer_Id: string;
  user_Id: string;
  primary_profession_name: string;
  name: string;
  experience: number;
  status: FreelancerStatus;
  rating: number;
  distance_km: number; // raw DB value
};
