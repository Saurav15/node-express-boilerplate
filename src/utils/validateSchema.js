import CustomException from './exceptions/customException.js';

/**
 * Validate the request body against a Joi schema.
 *
 * @param {import('joi').ObjectSchema} schema - The Joi schema to validate against.
 * @param {object} body - The request body to be validated.
 * @throws {CustomException} Throws a validation error with details if validation fails.
 */
export const validateSchema = (schema) => {
    return (req,res,next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
    
        if (error) {
            // Extract validation error details
            const validationErrors = error.details.map((detail) => {
                return { message: detail.message, path: detail.path };
            });
    
            // Throw a custom exception with validation errors
            throw CustomException('Validation Error', 400, validationErrors);
        }

        next();
    }
};
