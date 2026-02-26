import { Router } from "express";
import { authGuard, rolesGuard } from "../guards";
import { freelancerController } from "../container";
import { Role } from "@prisma/client";
import { validate } from "../decorators";
import {
  freelancerIdParamSchema,
  validateFreelancerProfileCompletedInput,
  validateGetAllVisibleFreelancersInput,
  validateGetFreelancersGalleryInput,
  validateGetSingleVisibleFreelancerDetailInput,
  // galleryImageIdParamSchema,
  // validateGetGalleryImagesInput,
} from "../validators";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.route("/complete-profile").post(
  authGuard,
  rolesGuard(Role.FREELANCER),
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "idImage", maxCount: 1 },
  ]),
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

// Gallery routes
router.route("/:freelancerId/gallery/list").post(
  authGuard,
  rolesGuard(Role.USER, Role.FREELANCER),
  validate({
    body: validateGetFreelancersGalleryInput,
    params: freelancerIdParamSchema,
  }),
  freelancerController.getGalleryImages,
);

router.route("/:freelancerId/gallery").post(
  authGuard,
  rolesGuard(Role.FREELANCER),
  upload.fields([{ name: "images", maxCount: 5 }]),
  validate({
    params: freelancerIdParamSchema,
  }),
  freelancerController.addGalleryImages,
);

// router
//   .route("/gallery/:imageId")
//   .delete(
//     authGuard,
//     rolesGuard(Role.FREELANCER),
//     validate({ params: imageIdParamSchema }),
//     freelancerController.deleteGalleryImage,
//   );

export default router;
