import { Router } from "express";
import { authGuard } from "../guards";
import { freelancerController } from "../container";

const router = Router();

router
  .route("/complete-profile")
  .post(authGuard, freelancerController.completeFreelancerProfile);

export default router;
