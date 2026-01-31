import { Profession } from "./profession.types";
import { Skill } from "./skill.types";
import { User } from "./user.types";

export interface FreelancerProfileCompletedInput {
  professionId: string;
  skillIds: string[];
  experience: number;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number | null;
  };
}

export enum FREELANCER_STATUS {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface FreelancerSkill {
  skill: Skill;
}

export interface Freelancer {
  id: string;
  userId: string;
  experience: number;
  phone: string;
  status: FREELANCER_STATUS;
  rating: number;

  primaryProfessionId: string;

  createdAt: string; // ISO string
  updatedAt: string;

  // relations
  user: User;
  primaryProfession: Profession;
  skills: FreelancerSkill[];
}
