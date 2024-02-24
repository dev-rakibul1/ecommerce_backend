import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const getAuthFilter = async (token: string | undefined): Promise<IUser> => {
  if (!token) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden User.");
  }

  // Decoding the JWT payload
  const decodedPayload = jwt.decode(token) as JwtPayload;
  // console.log(decodedPayload);

  const email = decodedPayload?.email;

  if (!email) {
    throw new ApiError(httpStatus.FORBIDDEN, "Email not found in JWT payload");
  }

  const user = await User.findOne({ email }).populate("products");

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found.");
  }

  return user;
};

export const getAuthServices = {
  getAuthFilter,
};
