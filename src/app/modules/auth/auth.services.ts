import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config/Config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { User } from "../user/user.model";
import { IAuthLogin } from "./auth.interface";
import { IRefreshToken, IUserLoginResponse } from "./auth.type";

const loginUserService = async (
  payload: IAuthLogin
): Promise<IUserLoginResponse> => {
  const { email, password } = payload;

  const user = new User();
  const isEmailExist = await user.isEmailExist(email);

  if (!isEmailExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  const isPasswordMatch = await bcrypt.compare(
    password,
    isEmailExist.password as string
  );
  if (!isPasswordMatch) {
    throw new Error("Password does not match.");
  }

  // Access token
  const accessToken = jwtHelpers.createToken(
    {
      email: isEmailExist?.email,
      role: isEmailExist?.role,
    },
    config.jwtAccessKey as Secret,
    config.jwtAccessExpireDate as string
  );

  // Refresh token
  const refreshToken = jwtHelpers.createToken(
    { email: isEmailExist?.email, role: isEmailExist?.role },
    config.jwtRefreshKey as Secret,
    config.jwtRefreshExpireDate as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshTokenService = async (token: string): Promise<IRefreshToken> => {
  let verifyToken = null;
  try {
    verifyToken = jwtHelpers.verifyToken(token, config.jwtRefreshKey as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token.");
  }

  const { email } = verifyToken;

  const user = new User();
  const isEmailExist = await user.isEmailExist(email);

  if (!isEmailExist?.email) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  // generate a new token
  const newAccessToken = jwtHelpers.createToken(
    {
      userId: isEmailExist.email,
      role: isEmailExist.role,
    },
    config.jwtAccessKey as Secret,
    config.jwtAccessExpireDate as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const authService = {
  loginUserService,

  refreshTokenService,
};
