export interface Profession {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfessionWithFreelancerCount {
  profession_id: string;
  profession_name: string;
  count: number;
}
