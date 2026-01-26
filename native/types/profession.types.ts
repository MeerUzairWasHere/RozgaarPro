export interface Profession {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfessionWithFreelancerCount {
  id: string;
  name: string;
  _count: {
    freelancers: number;
  };
}
