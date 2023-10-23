import Joi from 'joi';

export const signUpSchema = Joi.object({
    fullname: Joi.string().min(3).max(30).required(true),
    email: Joi.string().email().required(true),
    password: Joi.string().min(8).required(),
});
