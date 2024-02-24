import express from "express";
import { ENUM_USER_ROLE } from "../../../enum/user";
import auth from "../../middleware/auth";
import { ProductController } from "./products.controller";

const router = express.Router();

router.post(
  "/create-product",
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.SELLER),
  ProductController.CreateProductController
);
router.get("/", ProductController.GetAllProductController);
router.get("/top-seller", ProductController.TopSellerProductController);
router.get("/:id", ProductController.GetSingleProductController);

export const ProductRoutes = router;
