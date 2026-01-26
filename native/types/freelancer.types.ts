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
