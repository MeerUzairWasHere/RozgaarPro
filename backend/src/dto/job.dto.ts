import { z } from "zod";
import { validateJobCreateInput } from "../validators";

export type JobCreateInputDto = z.infer<typeof validateJobCreateInput>;
