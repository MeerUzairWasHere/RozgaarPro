import { Router } from "express";
import { authGuard, rolesGuard } from "../guards";
import { skillController } from "../container";
import { Role } from "@prisma/client";

const router = Router();

router
  .route("/")
  .get(authGuard, rolesGuard(Role.FREELANCER), skillController.getAllSkills);

export default router;
