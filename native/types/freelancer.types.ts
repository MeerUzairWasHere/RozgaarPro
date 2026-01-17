export interface FreelancerProfileCompletedInput {
  skills: string[];
  experience: number;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number | null;
  };
}
