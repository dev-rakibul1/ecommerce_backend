import express from "express";
import { ProductController } from "./products.controller";

const router = express.Router();

router.post("/create-product", ProductController.CreateProductController);
router.get("/", ProductController.GetAllProductController);
router.get("/top-seller", ProductController.TopSellerProductController);
router.get("/:id", ProductController.GetSingleProductController);

export const ProductRoutes = router;
