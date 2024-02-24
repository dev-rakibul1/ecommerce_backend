"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleValidationError = void 0;
const HandleValidationError = (err) => {
    const errors = Object.values(err.errors).map((ele) => {
        return {
            path: ele === null || ele === void 0 ? void 0 : ele.path,
            message: ele === null || ele === void 0 ? void 0 : ele.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "Validation errors",
        errorMessage: errors,
    };
};
exports.HandleValidationError = HandleValidationError;
