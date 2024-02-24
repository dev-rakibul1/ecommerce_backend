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
exports.getAuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const getAuthFilter = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden User.");
    }
    // Decoding the JWT payload
    const decodedPayload = jsonwebtoken_1.default.decode(token);
    // console.log(decodedPayload);
    const email = decodedPayload === null || decodedPayload === void 0 ? void 0 : decodedPayload.email;
    if (!email) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Email not found in JWT payload");
    }
    const user = yield user_model_1.User.findOne({ email }).populate("products");
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found.");
    }
    return user;
});
exports.getAuthServices = {
    getAuthFilter,
};
