import dotenv from "dotenv";
dotenv.config("../../.env");

const env = process.env.NODE_ENV;

const dev = {
  // General
  env,
  port: process.env.PORT,
  // Bcrypt
  saltRounds: process.env.SALT_ROUNDS,
  // Newrelic
  newrelicAppName: process.env.NEWRELIC_APP_NAME,
  newrelicLicenseKey: process.env.NEWRELIC_LICENSE_KEY,
  newrelicLoggingLevel: process.env.NEWRELIC_LOGGING_LEVEL,
  // Mongo
  mongoDbUrl: process.env.MONGO_DB_DEV_URL,
  //Token
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  accessTokenExpTime: process.env.ACCESS_TOKEN_EXP_TIME,
  refreshTokenExpTime: process.env.REFRESH_TOKEN_EXP_TIME,
};

const prod = {};

const config = {
  dev,
  prod,
};

export default config[env];
