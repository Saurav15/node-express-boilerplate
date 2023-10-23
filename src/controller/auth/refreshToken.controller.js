import { createAccessToken } from "../../utils/auth/createToken.js"
import { isTokenValid } from "../../utils/auth/isTokenValid.js"
import { UnauthorizedException } from "../../utils/exceptions/exceptionFunctions/UnauthorizedException.js"
import { NotFoundException } from '../../utils/exceptions/exceptionFunctions/NotFoundExcepton.js'
import { User } from '../../models/userModel.js'
import { REFRESH_TOKEN_VERIFICATION_FAILED, USER_NOT_FOUND } from "../../constants/errorMessages.js"

/**
 * Refresh the access token using a valid refresh token.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 */
export const refreshToken = async (req, res, next) => {
    try {
        // Check if refresh token exists and is valid.
        const refreshToken = req.cookies["Refresh-Token"]

        if (!refreshToken) {
            throw UnauthorizedException()
        }

        // Verify Refresh token
        const tokenPayload = isTokenValid(refreshToken, REFRESH_TOKEN_VERIFICATION_FAILED)

        // Get user details
        const user = await User.findOne({ _id: tokenPayload.id });

        if (!user) {
            throw NotFoundException(USER_NOT_FOUND)
        }

        // Create a new accessToken
        const accessToken = createAccessToken({
            id: user.id,
            name: user.fullname,
        });

        // Set the new access token as a cookie and send it in the response
        res.cookie('Access-Token', accessToken, {
            secure: true,
        });

        res.send(accessToken);
    } catch (error) {
        // Pass any caught errors to the next middleware for error handling
        next(error);
    }
}
