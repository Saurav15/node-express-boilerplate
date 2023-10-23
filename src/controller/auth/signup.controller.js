import { User } from '../../models/userModel.js';
import { ConflictException } from '../../utils/exceptions/exceptionFunctions/ConflictException.js';
import {
    createAccessToken,
    createRefreshToken,
} from '../../utils/auth/createToken.js';
import { hash } from 'bcrypt';
import config from '../../config/config.js';
import { USER_ALREADY_EXISTS } from '../../constants/errorMessages.js';

/**
 * Register a new user by validating their information and providing access and refresh tokens.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 */
export const signup = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body;

        // Check if the given user already exists
        const userExists = await User.findOne({ email });

        // If the user already exists, throw a conflict exception
        if (userExists) {
            throw ConflictException(USER_ALREADY_EXISTS);
        }

        // Encrypt the password before storing it
        const hashedPassword = await hash(
            password,
            parseInt(config.saltRounds)
        );

        // Add the user to the database
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Create refresh and access tokens
        const refreshToken = createRefreshToken({ id: newUser.id });
        const accessToken = createAccessToken({
            id: newUser.id,
            name: newUser.fullname,
        });

        // Set cookies for refresh and access tokens
        res.cookie('Refresh-Token', refreshToken, {
            httpOnly: true,
            secure: true,
        });

        res.cookie('Access-Token', accessToken, {
            secure: true,
        });

        // Send a success response
        res.send("");
    } catch (error) {
        // Pass any caught errors to the next middleware for error handling
        next(error);
    }
};
