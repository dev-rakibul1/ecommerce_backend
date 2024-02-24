"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const createLoginAuthValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required.",
        })
            .nonempty("Email is required."),
        password: zod_1.z
            .string({
            required_error: "Password is required.",
        })
            .nonempty("Password you not provide empty value.")
            .min(8, "Password must be at least 8 characters long."),
    }),
});
const createRefreshTokenZodValidation = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z
            .string({
            required_error: "Refresh token is required.",
        })
            .nonempty("Please provide a refresh token."),
    }),
});
exports.authValidation = {
    createLoginAuthValidation,
    createRefreshTokenZodValidation,
};
