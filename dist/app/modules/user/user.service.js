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
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const Config_1 = __importDefault(require("../../../config/Config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = require("./user.model");
const randomSeed = Math.floor(Math.random() * 1000);
const imageUrl = `https://picsum.photos/seed/${randomSeed}/200/300`;
const createUserServices = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.role) {
        payload.role = "customer";
    }
    if (!payload.profilePicture) {
        payload.profilePicture = imageUrl;
    }
    const superAdmin = payload.role;
    if (superAdmin && superAdmin === "super_admin") {
        const isAdministrator = yield user_model_1.User.findOne({ role: superAdmin });
        if (isAdministrator) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Already have an super admin.");
        }
    }
    // Create access token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        email: payload === null || payload === void 0 ? void 0 : payload.email,
        role: payload === null || payload === void 0 ? void 0 : payload.role,
    }, Config_1.default.jwtAccessKey, Config_1.default.jwtAccessExpireDate);
    // Create refresh token
    jwtHelpers_1.jwtHelpers.createToken({ email: payload === null || payload === void 0 ? void 0 : payload.email, role: payload === null || payload === void 0 ? void 0 : payload.role }, Config_1.default.jwtRefreshKey, Config_1.default.jwtRefreshExpireDate);
    const result = yield user_model_1.User.create(payload);
    return {
        accessToken,
        data: result,
    };
});
const getUserServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.find({}).populate("products");
    return user;
});
const updateUserServices = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndUpdate(id, payload);
    return user;
});
const getSingleUserServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Invalid user");
    }
    return user;
});
exports.userServices = {
    createUserServices,
    getUserServices,
    updateUserServices,
    getSingleUserServices,
};
