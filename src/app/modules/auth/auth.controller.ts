import { Request, Response } from "express";
import httpStatus from "http-status";
import Config from "../../../config/Config";
import SendResponse from "../../../shared/SendResponse";
import TryCatch from "../../../shared/TryCatch";
import { authService } from "./auth.services";

const loginUser = TryCatch(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await authService.loginUserService(loginData);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: Config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successfully!",
    data: others,
  });
});

const refreshToken = TryCatch(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await authService.refreshTokenService(refreshToken);

  const cookieOptions = {
    secure: Config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  // if ('refreshToken' in result) {
  //   delete result.refreshToken;
  // }

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh token generate success!",
    data: result,
  });
});

const logoutToken = TryCatch(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    /* cookie options */
  });
  res.clearCookie("accessToken", {
    /* cookie options */
  });

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logout successfully!",
    data: null,
  });
});

export const loginController = {
  loginUser,
  refreshToken,
  logoutToken,
};
