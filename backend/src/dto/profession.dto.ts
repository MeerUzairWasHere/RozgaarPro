export type ProfessionWithFreelancerCount = {
  id: string;
  name: string;
  _count: {
    freelancers: number;
  };
};
