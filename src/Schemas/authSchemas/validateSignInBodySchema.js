import joi from "joi"

export const signInSchema = joi.object({
    email : joi.string().email({ tlds: { allow: false } }).required(),
    password : joi.string().required().min(8)
})