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
exports.ProductController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const SendResponse_1 = __importDefault(require("../../../shared/SendResponse"));
const TryCatch_1 = __importDefault(require("../../../shared/TryCatch"));
const products_services_1 = require("./products.services");
// Create products
const CreateProductController = (0, TryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield products_services_1.ProductServices.CreateProductServices(payload);
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product create success",
        data: result,
    });
}));
// Get all products
const GetAllProductController = (0, TryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_services_1.ProductServices.GetAllProductServices();
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product get success",
        data: result,
    });
}));
// Get single products
const GetSingleProductController = (0, TryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield products_services_1.ProductServices.GetSingleProductServices(id);
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single product get success",
        data: result,
    });
}));
//Top seller products
const TopSellerProductController = (0, TryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_services_1.ProductServices.TopSellerProductServices();
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Top seller get success",
        data: result,
    });
}));
exports.ProductController = {
    CreateProductController,
    GetAllProductController,
    GetSingleProductController,
    TopSellerProductController,
};
