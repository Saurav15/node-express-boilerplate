import logger from '../utils/logging/logger.js';

/**
 * Error Middleware
 * @param {Error} err - The error object passed from previous middleware.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - The next middleware function.
 */
const errorMiddleware = (err, req, res, next) => {
    // Log the error using the logger utility
    logger.error(err.message);

    // Check if response has already been sent, then we don't need to use this middleware
    if (res.headersSent) {
        next(err);
    }

    const statusCode = err.statusCode || 500;

    let error = {
        message: statusCode === 500 ? 'Internal Server Error' : err.message,
    };

    // To add list of all the errors that occured during validation.
    if (err.message === 'Validation Error') {
        error.errorList = err.errorList;
    }

    // responseSchema(res, statusCode, success, data, error)
    res.status(statusCode).send(error);

    next();
};

export default errorMiddleware;
