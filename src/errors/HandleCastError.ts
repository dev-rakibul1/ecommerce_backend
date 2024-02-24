import mongoose from "mongoose";
import IGenericErrorMessage from "../interfaces/error";

const HandleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: "Invalid Id",
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Validation errors",
    errorMessage: errors,
  };
};

export default HandleCastError;
