import express from "express";
import ValidateRequest from "../../middleware/ValidationRequest";
import { loginController } from "./auth.controller";
import { authValidation } from "./auth.validation";
const router = express.Router();

router.post(
  "/login",
  ValidateRequest(authValidation.createLoginAuthValidation),
  loginController.loginUser
);

router.post(
  "/create-refresh-token",
  ValidateRequest(authValidation.createRefreshTokenZodValidation),
  loginController.refreshToken
);

router.get("/logout", loginController.logoutToken);

export const authRoutes = router;
