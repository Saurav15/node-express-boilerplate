import responseSchema, { successEnum } from '../utils/responseObject.js'

const responseInterceptor = (req, res, next) => {
    const oldSend = res.send

    // Updating res.send
    res.send = function (body) {
        const response =
            res.statusCode >= 400
                ? responseSchema(res.statusCode, successEnum.error, null, body)
                : responseSchema(
                      res.statusCode,
                      successEnum.success,
                      body,
                      null
                  )

        res.send = oldSend
        return res.send(response)
    }

    next()
}

export default responseInterceptor
