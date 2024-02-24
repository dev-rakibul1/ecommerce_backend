"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("./products.controller");
const router = express_1.default.Router();
router.post("/create-product", products_controller_1.ProductController.CreateProductController);
router.get("/", products_controller_1.ProductController.GetAllProductController);
router.get("/top-seller", products_controller_1.ProductController.TopSellerProductController);
router.get("/:id", products_controller_1.ProductController.GetSingleProductController);
exports.ProductRoutes = router;
