import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import { UnauthorizedException } from '../exceptions/exceptionFunctions/UnauthorizedException.js';

/**
 * Verify and decode a JSON Web Token (JWT) and return the decoded payload.
 *
 * @param {string} token - The JWT token to be verified and decoded.
 * @param {string} errorMessage - The error message to be used if verification fails.
 * @returns {object} - The decoded payload if verification is successful.
 * @throws {UnauthorizedException} - Throws an unauthorized exception if JWT verification fails.
 */
export const isTokenValid = (token, errorMessage) => {
    const tokenPayload = jwt.verify(token, config.jwtSecretKey, (error, decodedPayload) => {
        if (error) {
            // If JWT verification fails, throw an unauthorized exception
            throw UnauthorizedException(errorMessage);
        }
        return decodedPayload;
    });

    return tokenPayload;
};
