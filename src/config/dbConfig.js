import mongoose from "mongoose";
import config from "./config.js";
import logger from "../utils/logging/logger.js";

/**
 * Connect to the MongoDB database.
 *
 * @throws {Error} If the connection to the database fails, an error is thrown.
 */
try {
  mongoose.connect(config.mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  logger.info("Connected to the database...");
} catch (error) {
  logger.error("Error in database connection: ", error);
}
