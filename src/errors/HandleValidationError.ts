import mongoose from "mongoose";
import { IGenericErrorResponse } from "../interfaces/common";
import IGenericErrorMessage from "../interfaces/error";

export const HandleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (ele: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: ele?.path,
        message: ele?.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: "Validation errors",
    errorMessage: errors,
  };
};
