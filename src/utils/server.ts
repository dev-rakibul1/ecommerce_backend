import { Server } from "http";
import mongoose from "mongoose";
import Config from "../config/Config";
import app from "../index";

let server: Server;
const databaseConnect = async () => {
  try {
    await mongoose.connect(Config.serverConnect as string);
    console.log("Database is connected!");

    server = app.listen(Config.port, () => {
      console.log(`Our server listen port is: ${Config.port}`);
    });
  } catch (error) {
    console.log("Fail to DB connected!");
  }
};

process.on("unhandledRejection", (error) => {
  if (server) {
    server.close(() => {
      console.log(error);
      process.exit(1);
    });
  } else {
    process.exit(2);
  }
});

process.on("SIGTERM", () => {
  console.log("SIGTERM is received!");
  if (server) {
    server.close();
  }
});

export default databaseConnect;
