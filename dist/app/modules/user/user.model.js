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
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const Config_1 = __importDefault(require("../../../config/Config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_constant_1 = require("./user.constant");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: user_constant_1.userRole,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: 0,
    },
    profilePicture: {
        type: String,
        trim: true,
    },
    products: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Products",
        },
    ],
    cart: {
        type: [],
    },
    newPassword: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// Add method to add product to user
userSchema.methods.addProductToUser = function (productId) {
    return __awaiter(this, void 0, void 0, function* () {
        this.products.push(productId);
        yield this.populate("products").execPopulate();
        yield this.save();
    });
};
// unique email and phone number
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingEmail = yield this.model("User").findOne({
            email: this.email,
        });
        const existingPhone = yield this.model("User").findOne({
            phone: this.phone,
        });
        if (existingEmail) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Email is already in use");
        }
        if (existingPhone) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Phone number is already in use");
        }
        next();
    });
});
// id match
userSchema.methods.isEmailExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ email }, { _id: 1, password: 1, email: 1, role: 1 });
        return user;
    });
};
// password match
userSchema.methods.isPasswordMatch = function (currentPassword, savePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield bcrypt_1.default.compare(currentPassword, savePassword);
        return user;
    });
};
// password hash before save password
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(Config_1.default.bcrypt_salts_round));
        next();
    });
});
exports.User = (0, mongoose_1.model)("User", userSchema);
