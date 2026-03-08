import { Router } from "express";
import { Role } from "@prisma/client";
import { authGuard, rolesGuard } from "../guards";
import { reviewController } from "../container";
import { validate } from "../decorators";
import {
  reviewFreelancerIdParamSchema,
  validateCreateReviewInput,
  validateListReviewsInput,
} from "../validators/review.validator";

const router = Router();

router
  .route("/")
  .post(
    authGuard,
    rolesGuard(Role.USER),
    validate({ body: validateCreateReviewInput }),
    reviewController.createReview,
  );

router
  .route("/freelancers/:freelancerId/can-rate")
  .get(
    authGuard,
    rolesGuard(Role.USER),
    validate({ params: reviewFreelancerIdParamSchema }),
    reviewController.canRateFreelancer,
  );

router
  .route("/freelancers/:freelancerId/list")
  .post(
    authGuard,
    rolesGuard(Role.USER, Role.FREELANCER),
    validate({
      params: reviewFreelancerIdParamSchema,
      body: validateListReviewsInput,
    }),
    reviewController.listFreelancerReviews,
  );

export default router;
