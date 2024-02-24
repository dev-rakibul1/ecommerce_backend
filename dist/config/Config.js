"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    port: process.env.PORT || 9090,
    env: process.env.NODE_ENV,
    serverConnect: process.env.DATABASE_ATLAS_URL,
    bcrypt_salts_round: process.env.BCRYPT_SALT_ROUNDS,
    jwtAccessKey: process.env.JWT_ACCESS_SECRET,
    jwtAccessExpireDate: process.env.JWT_ACCESS_SECRET_EXPIRE_IN,
    jwtRefreshKey: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpireDate: process.env.JWT_REFRESH_SECRET_EXPIRE_IN,
};
