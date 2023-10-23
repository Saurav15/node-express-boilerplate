/**
 * Custom exception function for handling errors.
 *
 * @param {string} message - The error message.
 * @param {number} statusCode - The HTTP status code associated with the error.
 * @param {any} errorList - Additional error details or a list of validation errors (optional).
 * @returns {Error} An error object representing the custom exception.
 *
 * @example
 * const error = CustomException('An error occurred', 500);
 * throw error;
 */
const CustomException = (message, statusCode, errorList) => {
    // Create a new Error object with the provided message
    const error = new Error(message);
    
    // Set the status code and optional error list
    error.statusCode = statusCode;
    error.errorList = errorList; // To be used when validation errors occur.
    
    return error;
}

export default CustomException;
