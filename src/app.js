import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import config from './config/config.js';
import router from './routes/routes.js';
import logger from './utils/logging/logger.js';

// Import and execute the database connection logic from 'dbConfig.js'
import './config/dbConfig.js';

import errorMiddleware from './middleware/errorHandler.middleware.js';
import responseInterceptor from './middleware/responseInterceptor.middleware.js';
import pageNotFound from './middleware/pageNotFound.middleware.js';

const app = express();

/**
 * Middleware to parse cookie data
 */
app.use(cookieParser());

/**
 * Middleware to parse JSON request bodies and make them available as JavaScript objects in req.body.
 */
app.use(express.json());

/**
 * Middleware to take the response and edit it as per responseSchema. We achieve it by updating the res.send() method of express.
 */
app.use(responseInterceptor);

/**
 * Middleware to log HTTP requests using Morgan. It uses the 'tiny' format and streams logs to the logger.
 */
app.use(
    morgan('combined', {
        stream: {
            write: (message) => logger.http(message),
        },
    })
);

/**
 * Use the 'router' to handle routing for various endpoints.
 */
app.use(router);

/**
 * Middleware to handle the situation when no api route is matched.
 */
app.use(pageNotFound);

/**
 * Custom error handling middleware to log errors using the logger and send error responses to clients.
 */
app.use(errorMiddleware);

// Start the server and listen on the specified port.
app.listen(config.port, () => {
    logger.info(`Server running at ${config.port}`);
});
