import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import GlobalErrorHandler from "./app/middleware/globalErrorHandler";
import router from "./app/routes/app.routes";
import databaseConnect from "./utils/server";
const app: Application = express();

// middle were calling
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Application router or Application middleware
app.use("/api/v1", router);

// GLOBAL ERROR HANDLING AND PRODUCTION LABEL
app.use(GlobalErrorHandler);

// global error handling
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Route not found.",
    errorMessage: [
      {
        path: req.originalUrl,
        message: "API not found!",
      },
    ],
  });
  next();
});

// Database connected
databaseConnect();

export default app;
