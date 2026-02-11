import { Router } from "express";
import { authGuard, rolesGuard } from "../guards";
import { professionController, skillController } from "../container";
import { Role } from "@prisma/client";
import { validateProfessionFilterListInput } from "../validators";
import { validate } from "../decorators";

const router = Router();

router
  .route("/")
  .get(
    authGuard,
    rolesGuard(Role.FREELANCER),
    professionController.getAllProfessions,
  );

router
  .route("/filter-list")
  .post(
    authGuard,
    rolesGuard(Role.USER),
    validate({ body: validateProfessionFilterListInput }),
    professionController.getProfessionsFilterList,
  );

router
  .route("/:professionId")
  .get(
    authGuard,
    rolesGuard(Role.FREELANCER),
    professionController.getSingleProfession,
  );

router
  .route("/:professionId/skills")
  .get(
    authGuard,
    rolesGuard(Role.FREELANCER),
    skillController.getSkillsByProfession,
  );

export default router;
