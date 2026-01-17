import { Freelancer, FreelancerLocation, Skill } from "@prisma/client";

export type FreelancerProfileCompletedInput = {
  skills: Skill["name"][];
  experience: Freelancer["experience"];
  location: {
    latitude: FreelancerLocation["latitude"];
    longitude: FreelancerLocation["longitude"];
    accuracy: FreelancerLocation["accuracy"];
  };
};
