import CustomException from "../customException.js";

/**
 * Create a custom ConflictException with a specified field name.
 *
 * @param {string} errorMessage - The name of the field that caused the conflict.
 * @returns {CustomException} A custom exception representing a conflict.
 * @throws {CustomException} Throws a custom exception with a 409 status code and an error message.
 *
 * @example
 * // Creating a conflict exception for the "email" field.
 * const conflictError = conflictException("email");
 *
 * // Throwing the custom exception.
 * throw conflictError;
 */
export const ConflictException = (errorMessage) => {
    const statusCode = 409;
    return CustomException(errorMessage, statusCode);
};
