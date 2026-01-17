import { Router } from "express";
import { authGuard } from "../guards";
import { skillController } from "../container";

const router = Router();

router.route("/").get(authGuard, skillController.getAllSkills);

export default router;
