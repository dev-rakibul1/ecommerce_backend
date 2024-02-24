import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import Config from "../../config/Config";
import ApiError from "../../errors/ApiError";
import HandleCastError from "../../errors/HandleCastError";
import { HandleValidationError } from "../../errors/HandleValidationError";
import HandleZodError from "../../errors/HandleZodError";
import IGenericErrorMessage from "../../interfaces/error";

const GlobalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  Config.env === "development"
    ? console.log(`Global error handle when development mode ~~~`, err)
    : console.log(`Global error handle when production mode ~~~`, err);

  let statusCode = 500;
  let message = "Something is wrong!";
  let errorMessage: IGenericErrorMessage[] = [];

  if (err?.name === "ValidationError") {
    const simplifiedError = HandleValidationError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (err instanceof ZodError) {
    const simplifiedError = HandleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (err?.name === "CastError") {
    const simplifiedError = HandleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessage = err?.message
      ? [
          {
            path: "",
            message: err.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessage = err?.message
      ? [
          {
            path: "",
            message: err.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: Config.env !== "production" ? err?.stack : undefined,
  });

  next();
};

export default GlobalErrorHandler;
