import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 9090,
  env: process.env.NODE_ENV,
  serverConnect: process.env.DATABASE_ATLAS_URL,
  password_sold_round: process.env.BCRYPT_SALT_ROUNDS,
};
