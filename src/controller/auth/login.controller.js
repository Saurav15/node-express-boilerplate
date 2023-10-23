import { compare } from "bcrypt";
import { User } from "../../models/userModel.js";
import { NotFoundException } from "../../utils/exceptions/exceptionFunctions/NotFoundExcepton.js";
import { INVALID_EMAIL_PASSWORD } from "../../constants/errorMessages.js";
import { createAccessToken, createRefreshToken } from "../../utils/auth/createToken.js";

/**
 * Log in a user by validating their email and password and providing access and refresh tokens.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 */
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists.
        const userExists = await User.findOne({ email });

        // Compare password
        const comparePassword = await compare(password, userExists.password);

        // Throw error if user does not exist or password is incorrect
        if (!userExists || !comparePassword) {
            throw NotFoundException(INVALID_EMAIL_PASSWORD);
        }

        // Send refresh and access tokens.
        const refreshToken = createRefreshToken({ id: userExists.id });
        const accessToken = createAccessToken({ id: userExists.id, name: userExists.fullname });

        // Set cookies for refresh and access tokens
        res.cookie("Refresh-Token", refreshToken, {
            httpOnly: true,
            secure: true,
        });

        res.cookie("Access-Token", accessToken, {
            secure: true,
        });

        res.send("");
    } catch (error) {
        // Pass any caught errors to the next middleware for error handling
        next(error);
    }
}
