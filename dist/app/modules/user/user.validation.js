"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodValidation = void 0;
const zod_1 = require("zod");
const createUserZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z
            .string({ required_error: "First name is required!" })
            .max(55, "First name max 55 length.")
            .min(3, "First name min 3 length."),
        middleName: zod_1.z.string().max(55, "Middle name max 55 length.").optional(),
        lastName: zod_1.z
            .string({ required_error: "Last name is required!" })
            .max(55, "Last name max 55 length.")
            .min(3, "Last name min 3 length."),
        email: zod_1.z
            .string({ required_error: "Email is required!" })
            .refine((email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email), {
            message: "Invalid email format!",
        }),
        profilePicture: zod_1.z.string().optional(),
        gender: zod_1.z.string({ required_error: "Gender is required!" }),
        phone: zod_1.z
            .string({ required_error: "Phone is required!" })
            .refine((phone) => /\+?\d{8,15}$/.test(phone), {
            message: "Invalid phone number format!",
        }),
        address: zod_1.z
            .string({ required_error: "Address is required!" })
            .max(55, "Address max 55 length.")
            .min(3, "Address min 3 length."),
        role: zod_1.z.string().optional(),
        password: zod_1.z
            .string({ required_error: "Password is required!" })
            .refine((password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password), {
            message: "Password must be at least 8 characters long and include both letters and numbers.",
        }),
    }),
});
const updateUserZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z
            .string()
            .max(55, "First name max 55 length.")
            .min(3, "First name min 3 length.")
            .optional(),
        middleName: zod_1.z.string().max(55, "Middle name max 55 length.").optional(),
        lastName: zod_1.z
            .string()
            .max(55, "Last name max 55 length.")
            .min(3, "Last name min 3 length.")
            .optional(),
        email: zod_1.z
            .string()
            .refine((email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email), {
            message: "Invalid email format!",
        })
            .optional(),
        profilePicture: zod_1.z.string().optional(),
        gender: zod_1.z.string().optional(),
        phone: zod_1.z
            .string()
            .refine((phone) => /\+?\d{8,15}$/.test(phone), {
            message: "Invalid phone number format!",
        })
            .optional(),
        address: zod_1.z.string().optional(),
        role: zod_1.z.enum(["super_admin", "seller", "customer"]).nullable().optional(),
        password: zod_1.z
            .string()
            .refine((password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password), {
            message: "Password must be at least 8 characters long and include both letters and numbers.",
        })
            .optional(),
    }),
});
exports.UserZodValidation = {
    createUserZodValidation,
    updateUserZodValidation,
};
