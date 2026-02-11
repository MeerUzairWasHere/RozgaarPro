import { z } from "zod";
import { validateProfessionFilterListInput } from "../validators";

export type ProfessionWithFreelancerCount = {
  profession_id: string;
  profession_name: string;
  count: number;
};

export type ProfessionWithFreelancerCountInputDto = z.infer<
  typeof validateProfessionFilterListInput
>;
