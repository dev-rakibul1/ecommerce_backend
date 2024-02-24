"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_route_1 = require("../modules/products/products.route");
const appRouters = express_1.default.Router();
const moduleRoutes = [{ path: "/products", route: products_route_1.ProductRoutes }];
moduleRoutes.forEach((route) => appRouters.use(route.path, route.route));
// moduleRoutes.forEach((route) => appRouters.use(route.path, route.route));
exports.default = appRouters;
