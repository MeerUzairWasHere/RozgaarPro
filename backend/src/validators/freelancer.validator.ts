import { z } from "zod";

export const validateFreelancerProfileCompletedInput = z.object({
  professionId: z.string().min(1, { message: "Profession id is required" }),
  skillIds: z
    .array(z.string().min(1, { message: "Skill id is required" }))
    .max(3, { message: "Skill ids must be at most 3 long" }),
  experience: z.string().min(1, { message: "Experience is required" }),
  location: z.object({
    latitude: z
      .number()
      .min(-90, { message: "Latitude must be between -90 and 90" })
      .max(90, { message: "Latitude must be between -90 and 90" }),
    longitude: z
      .number()
      .min(-180, { message: "Longitude must be between -180 and 180" })
      .max(180, { message: "Longitude must be between -180 and 180" }),
    accuracy: z
      .number()
      .min(0, { message: "Accuracy must be a positive number" }),
  }),
});
