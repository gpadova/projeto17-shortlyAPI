import joi from "joi"

export const signUpSchema = joi.object({
    name : joi.string().required(),
    email : joi.string().email({ tlds: { allow: false } }).required(),
    password : joi.string().required().min(4),
    confirmPassword : joi.string().required()
})