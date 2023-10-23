import CustomException from "../customException.js";

export const NotFoundException = (errorMessage) => {
    const statusCode = 404;
    return CustomException(errorMessage,statusCode);
}