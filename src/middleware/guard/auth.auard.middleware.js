import { UnauthorizedException } from '../../utils/exceptions/exceptionFunctions/UnauthorizedException.js';
import { User } from '../../models/userModel.js';
import { NotFoundException } from '../../utils/exceptions/exceptionFunctions/NotFoundExcepton.js';
import {
    ACCESS_TOKEN_VERIFICATION_FAILED,
    USER_NOT_FOUND,
} from '../../constants/errorMessages.js';
import { isTokenValid } from '../../utils/auth/isTokenValid.js';

/**
 * Middleware for authenticating user requests.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 */
// eslint-disable-next-line no-unused-vars
export const authGuardMiddleware = (role) => {
    return async (req, res, next) => {
        try {
            // Get access token from cookies
            const accessToken = req.cookies['Access-Token'];

            // If the access token is missing, throw an unauthorized exception
            if (!accessToken) {
                throw UnauthorizedException('Access token is missing');
            }

            // Verify the access token using JWT
            const tokenPayload = isTokenValid(
                accessToken,
                ACCESS_TOKEN_VERIFICATION_FAILED
            );

            // Find the user associated with the provided ID
            const user = await User.findOne({ _id: tokenPayload.id });

            // If the user is not found, throw a not found exception
            if (!user) {
                throw NotFoundException(USER_NOT_FOUND);
            }

            // Attach the user to the request for further processing
            req.user = user;

            // Continue to the next middleware
            next();
        } catch (error) {
            // Pass any caught errors to the next middleware for error handling
            next(error);
        }
    };
};
