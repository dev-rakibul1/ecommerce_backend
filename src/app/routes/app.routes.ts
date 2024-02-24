import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { getAuthRoutes } from "../modules/getAuth/getAuth.route";
import { ProductRoutes } from "../modules/products/products.route";
import { userRoutes } from "../modules/user/user.route";

const appRouters = express.Router();

const moduleRoutes = [
  { path: "/products", route: ProductRoutes },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/get-auth",
    route: getAuthRoutes,
  },
];

moduleRoutes.forEach((route) => appRouters.use(route.path, route.route));

export default appRouters;
