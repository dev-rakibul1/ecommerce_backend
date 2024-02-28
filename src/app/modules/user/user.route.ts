import express from "express";
import { ENUM_USER_ROLE } from "../../../enum/user";
import ValidateRequest from "../../middleware/ValidationRequest";
import auth from "../../middleware/auth";
import { userController } from "./user.controller";
import { UserZodValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-user",
  ValidateRequest(UserZodValidation.createUserZodValidation),
  userController.createUserController
);
router.get("/", userController.getUserController);
router.get(
  "/:id",
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.SELLER,
    ENUM_USER_ROLE.CUSTOMER
  ),
  userController.getSingleUserController
);
router.patch(
  "/:id",
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.SELLER,
    ENUM_USER_ROLE.CUSTOMER
  ),
  userController.updateUserController
);

export const userRoutes = router;
