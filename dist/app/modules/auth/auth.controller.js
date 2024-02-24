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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const Config_1 = __importDefault(require("../../../config/Config"));
const SendResponse_1 = __importDefault(require("../../../shared/SendResponse"));
const TryCatch_1 = __importDefault(require("../../../shared/TryCatch"));
const auth_services_1 = require("./auth.services");
const loginUser = (0, TryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = __rest(req.body, []);
    const result = yield auth_services_1.authService.loginUserService(loginData);
    const { refreshToken } = result, others = __rest(result, ["refreshToken"]);
    const cookieOptions = {
        secure: Config_1.default.env === "production",
        httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Login successfully!",
        data: others,
    });
}));
const refreshToken = (0, TryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_services_1.authService.refreshTokenService(refreshToken);
    const cookieOptions = {
        secure: Config_1.default.env === "production",
        httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    // if ('refreshToken' in result) {
    //   delete result.refreshToken;
    // }
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Refresh token generate success!",
        data: result,
    });
}));
const logoutToken = (0, TryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("refreshToken", {
    /* cookie options */
    });
    res.clearCookie("accessToken", {
    /* cookie options */
    });
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Logout successfully!",
        data: null,
    });
}));
exports.loginController = {
    loginUser,
    refreshToken,
    logoutToken,
};
