import { Router } from "express";
import { authGuard, rolesGuard } from "../guards";
import { freelancerController } from "../container";
import { Role } from "@prisma/client";
import { validate } from "../decorators";
import { validateFreelancerProfileCompletedInput } from "../validators";

const router = Router();

router
  .route("/")
  .post(
    authGuard,
    rolesGuard(Role.USER),
    freelancerController.getAllVisibleFreelancers,
  );

router
  .route("/:freelancerId")
  .get(
    authGuard,
    rolesGuard(Role.USER),
    freelancerController.getFreelancerDetails,
  );

router
  .route("/:freelancerId/status")
  .get(
    authGuard,
    rolesGuard(Role.FREELANCER),
    freelancerController.getFreelancerStatus,
  );

router
  .route("/complete-profile")
  .post(
    authGuard,
    rolesGuard(Role.FREELANCER),
    validate(validateFreelancerProfileCompletedInput),
    freelancerController.completeFreelancerProfile,
  );

export default router;
