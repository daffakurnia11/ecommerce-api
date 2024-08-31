import { config } from "./index";

export const jwtConfig = {
  secret: config.jwt.secret,
  refreshSecret: config.jwt.refreshSecret,
  expiresIn: config.jwt.expiresIn,
  refreshExpiresIn: config.jwt.refreshExpiresIn,
};
