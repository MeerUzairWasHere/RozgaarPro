import { Router } from "express";
import { Role } from "@prisma/client";
import { companyController } from "../container";

import { validate } from "../decorators";
import { validateCompanyCreateInput } from "../validators";
import { authGuard, rolesGuard } from "../guards";

const router = Router();

router
  .route("/")
  .post(
    authGuard,
    rolesGuard(Role.ADMIN),
    validate({ body: validateCompanyCreateInput }),
    companyController.createCompany,
  )
  .get(authGuard, rolesGuard(Role.ADMIN), companyController.getCompany)
  .delete(authGuard, rolesGuard(Role.ADMIN), companyController.deleteCompany);

export default router;
