import { Router } from "express";
import { authGuard, rolesGuard } from "../guards";
import { Role } from "@prisma/client";
import { jobController } from "../container";
import { validate } from "../decorators";
import { freelancerIdParamSchema, validateJobCreateInput } from "../validators";

const router = Router();

router
  .route("/request/:freelancerId")
  .post(
    authGuard,
    rolesGuard(Role.USER),
    validate({ body: validateJobCreateInput, params: freelancerIdParamSchema }),
    jobController.createJob,
  );

export default router;
