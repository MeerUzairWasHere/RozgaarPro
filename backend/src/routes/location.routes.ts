import { Router } from "express";
import { locationController } from "../container";
import { validate } from "../decorators";
import { validateGetAddressFromCoordinatesInput } from "../validators";

const router = Router();

router.route("/address-from-coords").post(
  // authGuard,
  validate({ body: validateGetAddressFromCoordinatesInput }),
  locationController.getAddressFromCoordinates,
);

export default router;
