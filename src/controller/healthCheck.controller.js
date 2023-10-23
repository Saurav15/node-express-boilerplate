import config from "../config/config.js";
import mongoose from "mongoose";

/**
 * Check the health of the application and MongoDB connection.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware next function.
 */
const healthCheck = (req, res) => {
    // Check the status of the MongoDB connection.
    const dbStatus = mongoose.connection.readyState === 1 ? "healthy" : "unhealthy";

    // Create an object with the health status information.
    const healthStatus = {
        status: 'up',
        environment: config.env,
        mongoDb: dbStatus,
    }
    
    // throw new Error("Opppps")

    // Send the health status as the response.
    res.send(healthStatus);
}

export default healthCheck;
