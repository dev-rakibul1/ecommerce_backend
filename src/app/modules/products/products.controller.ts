import { Request, Response } from "express";
import httpStatus from "http-status";
import SendResponse from "../../../shared/SendResponse";
import TryCatch from "../../../shared/TryCatch";
import { IProducts } from "./products.interface";
import { ProductServices } from "./products.services";

// Create products
const CreateProductController = TryCatch(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await ProductServices.CreateProductServices(payload);

    SendResponse<IProducts>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product create success",
      data: result,
    });
  }
);

// Get all products
const GetAllProductController = TryCatch(
  async (req: Request, res: Response) => {
    const result = await ProductServices.GetAllProductServices();

    SendResponse<IProducts[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product get success",
      data: result,
    });
  }
);
// Get single products
const GetSingleProductController = TryCatch(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ProductServices.GetSingleProductServices(id);

    SendResponse<IProducts | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single product get success",
      data: result,
    });
  }
);
//Top seller products
const TopSellerProductController = TryCatch(
  async (req: Request, res: Response) => {
    const result = await ProductServices.TopSellerProductServices();

    SendResponse<IProducts[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Top seller get success",
      data: result,
    });
  }
);

export const ProductController = {
  CreateProductController,
  GetAllProductController,
  GetSingleProductController,
  TopSellerProductController,
};
