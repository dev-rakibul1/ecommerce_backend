"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const getAuth_controller_1 = require("./getAuth.controller");
const router = express_1.default.Router();
router.get("/", getAuth_controller_1.getAuthController.getAuth);
exports.getAuthRoutes = router;
