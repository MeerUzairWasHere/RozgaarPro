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

export interface Freelancer {
  id: string;
  userId: string;

  experience: number;
  phone: string;
  status: FREELANCER_STATUS;
  rating: number;

  primaryProfessionId: string;

  createdAt: string; // ISO string from API
  updatedAt: string;
}
