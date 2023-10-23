import CustomException from "../utils/exceptions/customException.js"

const pageNotFound = () => {
    throw CustomException("Bad request: Page Not found")
}

export default pageNotFound
