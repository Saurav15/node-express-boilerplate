import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

/**
 * Create a JSON Web Token (JWT) using the provided payload and expiration time.
 *
 * @param {object} payload - The data to be included in the JWT.
 * @param {string|number} expiryTime - The expiration time for the token.
 * @returns {string} - The generated JWT.
 */
const createToken = (payload, expiryTime) => {
    const token = jwt.sign(payload, config.jwtSecretKey, {
        expiresIn: expiryTime
    });
    return token;
}

/**
 * Create an access token using the provided payload.
 *
 * @param {object} payload - The data to be included in the access token.
 * @returns {string} - The generated access token.
 */
export const createAccessToken = (payload) => {
    return createToken(payload, config.accessTokenExpTime);
}

/**
 * Create a refresh token using the provided payload.
 *
 * @param {object} payload - The data to be included in the refresh token.
 * @returns {string} - The generated refresh token.
 */
export const createRefreshToken = (payload) => {
    return createToken(payload, config.refreshTokenExpTime);
}
