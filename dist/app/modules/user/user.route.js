"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enum/user");
const ValidationRequest_1 = __importDefault(require("../../middleware/ValidationRequest"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/create-user", (0, ValidationRequest_1.default)(user_validation_1.UserZodValidation.createUserZodValidation), user_controller_1.userController.createUserController);
router.get("/", user_controller_1.userController.getUserController);
router.get("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.SELLER), user_controller_1.userController.getSingleUserController);
router.patch("/:id", 
// auth(ENUM_USER_ROLE.SUPER_ADMIN),
user_controller_1.userController.updateUserController);
exports.userRoutes = router;
