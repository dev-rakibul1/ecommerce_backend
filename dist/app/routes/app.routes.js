"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const getAuth_route_1 = require("../modules/getAuth/getAuth.route");
const products_route_1 = require("../modules/products/products.route");
const user_route_1 = require("../modules/user/user.route");
const appRouters = express_1.default.Router();
const moduleRoutes = [
    { path: "/products", route: products_route_1.ProductRoutes },
    {
        path: "/user",
        route: user_route_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/get-auth",
        route: getAuth_route_1.getAuthRoutes,
    },
];
moduleRoutes.forEach((route) => appRouters.use(route.path, route.route));
exports.default = appRouters;
