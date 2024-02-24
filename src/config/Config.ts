import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 9090,
  env: process.env.NODE_ENV,
  serverConnect: process.env.DATABASE_ATLAS_URL,

  bcrypt_salts_round: process.env.BCRYPT_SALT_ROUNDS,
  jwtAccessKey: process.env.JWT_ACCESS_SECRET,
  jwtAccessExpireDate: process.env.JWT_ACCESS_SECRET_EXPIRE_IN,
  jwtRefreshKey: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpireDate: process.env.JWT_REFRESH_SECRET_EXPIRE_IN,
};
