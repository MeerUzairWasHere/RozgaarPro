import { Freelancer, FreelancerLocation, Skill } from "@prisma/client";

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
