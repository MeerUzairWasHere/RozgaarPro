import { Router } from "express";
import { authGuard, rolesGuard } from "../guards";
import { freelancerController } from "../container";
import { Role } from "@prisma/client";

const router = Router();

router
  .route("/")
  .get(
    authGuard,
    rolesGuard(Role.USER),
    freelancerController.getAllVisibleFreelancers,
  );

router
  .route("/status")
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
    freelancerController.completeFreelancerProfile,
  );

export default router;
