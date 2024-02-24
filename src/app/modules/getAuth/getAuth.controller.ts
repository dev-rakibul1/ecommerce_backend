import { Request, Response } from "express";
import httpStatus from "http-status";
import SendResponse from "../../../shared/SendResponse";
import TryCatch from "../../../shared/TryCatch";
import { IUser } from "../user/user.interface";
import { getAuthServices } from "./getAuth.services";

// get auth
const getAuth = TryCatch(async (req: Request, res: Response) => {
  const token = req.headers.authorization
    ? req.headers.authorization
    : undefined;

  const result = await getAuthServices.getAuthFilter(token);

  SendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Auth get success!",
    data: result,
  });
});

export const getAuthController = {
  getAuth,
};
