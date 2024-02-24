import { Request, Response } from "express";
import httpStatus from "http-status";
import SendResponse from "../../../shared/SendResponse";
import TryCatch from "../../../shared/TryCatch";
import { ICrateUserWithToken, IUser } from "./user.interface";
import { userServices } from "./user.service";

// Create user
const createUserController = TryCatch(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await userServices.createUserServices(payload);

  SendResponse<ICrateUserWithToken>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created success!",
    data: result,
  });
});
// get user
const getUserController = TryCatch(async (req: Request, res: Response) => {
  const result = await userServices.getUserServices();

  SendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User get success!",
    data: result,
  });
});
// get user
const updateUserController = TryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await userServices.updateUserServices(id, payload);

  SendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated success!",
    data: result,
  });
});

// get user
const getSingleUserController = TryCatch(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await userServices.getSingleUserServices(id);

    SendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated success!",
      data: result,
    });
  }
);

export const userController = {
  createUserController,
  getUserController,
  updateUserController,
  getSingleUserController,
};
