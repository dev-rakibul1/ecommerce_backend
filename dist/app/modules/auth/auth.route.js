"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ValidationRequest_1 = __importDefault(require("../../middleware/ValidationRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post("/login", (0, ValidationRequest_1.default)(auth_validation_1.authValidation.createLoginAuthValidation), auth_controller_1.loginController.loginUser);
router.post("/create-refresh-token", (0, ValidationRequest_1.default)(auth_validation_1.authValidation.createRefreshTokenZodValidation), auth_controller_1.loginController.refreshToken);
router.get("/logout", auth_controller_1.loginController.logoutToken);
exports.authRoutes = router;
