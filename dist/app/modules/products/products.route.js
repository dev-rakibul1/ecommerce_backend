"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enum/user");
const auth_1 = __importDefault(require("../../middleware/auth"));
const products_controller_1 = require("./products.controller");
const router = express_1.default.Router();
router.post("/create-product", (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.SELLER), products_controller_1.ProductController.CreateProductController);
router.get("/", products_controller_1.ProductController.GetAllProductController);
router.get("/top-seller", products_controller_1.ProductController.TopSellerProductController);
router.get("/:id", products_controller_1.ProductController.GetSingleProductController);
exports.ProductRoutes = router;
