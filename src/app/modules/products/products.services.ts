import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../user/user.model";
import { IProducts } from "./products.interface";
import { Products } from "./products.model";

// Create products
const CreateProductServices = async (
  payload: IProducts
): Promise<IProducts> => {
  const userId = payload.user;

  const isExistUser = await User.findById(userId);
  if (!isExistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found or not valid.");
  }

  const result = await Products.create(payload);

  await User.findByIdAndUpdate(userId, {
    $push: { products: result._id },
  });

  return result;
};

// Get all products
const GetAllProductServices = async (): Promise<IProducts[] | null> => {
  const result = await Products.find().sort({ createdAt: -1 });
  return result;
};

// Get all products
const GetSingleProductServices = async (
  id: string
): Promise<IProducts | null> => {
  const result = await Products.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Products not found");
  }
  return result;
};

// Top seller products
const TopSellerProductServices = async (): Promise<IProducts[] | null> => {
  const result = await Products.aggregate([
    {
      $match: {
        "ratings.average": { $gte: 4.6 },
      },
    },
    {
      $limit: 4,
    },
  ]);

  return result;
};

export const ProductServices = {
  CreateProductServices,
  GetAllProductServices,
  GetSingleProductServices,
  TopSellerProductServices,
};
