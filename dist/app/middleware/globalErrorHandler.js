"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const Config_1 = __importDefault(require("../../config/Config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const HandleCastError_1 = __importDefault(require("../../errors/HandleCastError"));
const HandleValidationError_1 = require("../../errors/HandleValidationError");
const HandleZodError_1 = __importDefault(require("../../errors/HandleZodError"));
const GlobalErrorHandler = (err, req, res, next) => {
    Config_1.default.env === "development"
        ? console.log(`Global error handle when development mode ~~~`, err)
        : console.log(`Global error handle when production mode ~~~`, err);
    let statusCode = 500;
    let message = "Something is wrong!";
    let errorMessage = [];
    if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplifiedError = (0, HandleValidationError_1.HandleValidationError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, HandleZodError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedError = (0, HandleCastError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (err instanceof ApiError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessage = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: "",
                    message: err.message,
                },
            ]
            : [];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessage = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: "",
                    message: err.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: Config_1.default.env !== "production" ? err === null || err === void 0 ? void 0 : err.stack : undefined,
    });
    next();
};
exports.default = GlobalErrorHandler;
