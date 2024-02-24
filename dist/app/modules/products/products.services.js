"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const products_model_1 = require("./products.model");
// Create products
const CreateProductServices = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = payload.user;
    const isExistUser = yield user_model_1.User.findById(userId);
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User not found or not valid.");
    }
    const result = yield products_model_1.Products.create(payload);
    yield user_model_1.User.findByIdAndUpdate(userId, {
        $push: { products: result._id },
    });
    return result;
});
// Get all products
const GetAllProductServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.find({});
    return result;
});
// Get all products
const GetSingleProductServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Products not found");
    }
    return result;
});
// Top seller products
const TopSellerProductServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.aggregate([
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
});
exports.ProductServices = {
    CreateProductServices,
    GetAllProductServices,
    GetSingleProductServices,
    TopSellerProductServices,
};
