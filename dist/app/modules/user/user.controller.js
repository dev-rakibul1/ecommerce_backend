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
exports.userController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const SendResponse_1 = __importDefault(require("../../../shared/SendResponse"));
const TryCatch_1 = __importDefault(require("../../../shared/TryCatch"));
const user_service_1 = require("./user.service");
// Create user
const createUserController = (0, TryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield user_service_1.userServices.createUserServices(payload);
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User created success!",
        data: result,
    });
}));
// get user
const getUserController = (0, TryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.getUserServices();
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User get success!",
        data: result,
    });
}));
// get user
const updateUserController = (0, TryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield user_service_1.userServices.updateUserServices(id, payload);
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User updated success!",
        data: result,
    });
}));
// get user
const getSingleUserController = (0, TryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userServices.getSingleUserServices(id);
    (0, SendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User updated success!",
        data: result,
    });
}));
exports.userController = {
    createUserController,
    getUserController,
    updateUserController,
    getSingleUserController,
};
