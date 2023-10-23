import CustomException from "../customException.js";

export const UnauthorizedException = (message) => {
    const errorMessage = message || "Unauthorized.";
    const statusCode = 401;
    return CustomException(errorMessage,statusCode)
}