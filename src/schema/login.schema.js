import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email().required(true),
    password: Joi.string().required(),
})