export const successEnum = {
    success: 'Success',
    error: 'Error',
}

const responseSchema = (statusCode, success, data, error) => {
    return {
        statusCode,
        success,
        data,
        error,
    }
}

export default responseSchema
