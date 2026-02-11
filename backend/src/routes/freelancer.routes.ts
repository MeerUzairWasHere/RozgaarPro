import { Router } from "express";
import { authGuard, rolesGuard } from "../guards";
import { freelancerController } from "../container";
import { Role } from "@prisma/client";
import { validate } from "../decorators";
import {
  freelancerIdParamSchema,
  validateFreelancerProfileCompletedInput,
  validateGetAllVisibleFreelancersInput,
  validateGetSingleVisibleFreelancerDetailInput,
} from "../validators";

const router = Router();

router
  .route("/complete-profile")
  .post(
    authGuard,
    rolesGuard(Role.FREELANCER),
    validate({ body: validateFreelancerProfileCompletedInput }),
    freelancerController.completeFreelancerProfile,
  );

router
  .route("/")
  .post(
    authGuard,
    rolesGuard(Role.USER),
    validate({ body: validateGetAllVisibleFreelancersInput }),
    freelancerController.getAllVisibleFreelancers,
  );

router.route("/:freelancerId").post(
  authGuard,
  rolesGuard(Role.USER),
  validate({
    body: validateGetSingleVisibleFreelancerDetailInput,
    params: freelancerIdParamSchema,
  }),
  freelancerController.getSingleVisibleFreelancerDetail,
);

router
  .route("/:freelancerId/status")
  .get(
    authGuard,
    rolesGuard(Role.FREELANCER),
    freelancerController.getFreelancerStatus,
  );

export default router;
