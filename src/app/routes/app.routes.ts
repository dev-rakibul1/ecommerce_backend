import express from "express";
import { ProductRoutes } from "../modules/products/products.route";

const appRouters = express.Router();

const moduleRoutes = [{ path: "/products", route: ProductRoutes }];

moduleRoutes.forEach((route) => appRouters.use(route.path, route.route));
// moduleRoutes.forEach((route) => appRouters.use(route.path, route.route));

export default appRouters;
