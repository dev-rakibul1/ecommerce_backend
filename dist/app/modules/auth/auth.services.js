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
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const Config_1 = __importDefault(require("../../../config/Config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = require("../user/user.model");
const loginUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = new user_model_1.User();
    const isEmailExist = yield user.isEmailExist(email);
    if (!isEmailExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist.");
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(password, isEmailExist.password);
    if (!isPasswordMatch) {
        throw new Error("Password does not match.");
    }
    // Access token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        email: isEmailExist === null || isEmailExist === void 0 ? void 0 : isEmailExist.email,
        role: isEmailExist === null || isEmailExist === void 0 ? void 0 : isEmailExist.role,
    }, Config_1.default.jwtAccessKey, Config_1.default.jwtAccessExpireDate);
    // Refresh token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ email: isEmailExist === null || isEmailExist === void 0 ? void 0 : isEmailExist.email, role: isEmailExist === null || isEmailExist === void 0 ? void 0 : isEmailExist.role }, Config_1.default.jwtRefreshKey, Config_1.default.jwtRefreshExpireDate);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshTokenService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifyToken = null;
    try {
        verifyToken = jwtHelpers_1.jwtHelpers.verifyToken(token, Config_1.default.jwtRefreshKey);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid refresh token.");
    }
    const { email } = verifyToken;
    const user = new user_model_1.User();
    const isEmailExist = yield user.isEmailExist(email);
    if (!(isEmailExist === null || isEmailExist === void 0 ? void 0 : isEmailExist.email)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist.");
    }
    // generate a new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        userId: isEmailExist.email,
        role: isEmailExist.role,
    }, Config_1.default.jwtAccessKey, Config_1.default.jwtAccessExpireDate);
    return {
        accessToken: newAccessToken,
    };
});
exports.authService = {
    loginUserService,
    refreshTokenService,
};
