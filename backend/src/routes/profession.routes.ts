import { Router } from "express";
import { authGuard, rolesGuard } from "../guards";
import { professionController, skillController } from "../container";
import { Role } from "@prisma/client";

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
  .get(
    authGuard,
    rolesGuard(Role.USER),
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
