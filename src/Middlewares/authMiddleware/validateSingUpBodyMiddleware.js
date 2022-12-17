import { signUpSchema } from "../../Schemas/authSchemas/validateSignUpBody.js";
import connectionDB from "../../Database/db.js";

export default async function validateSignUpBody(req, res, next){
    const user = req.body
    const {error} = signUpSchema.validate(user, {abortEarly: false})

    if(error){
        const errors = error.details.map(det => det.message)
        return res.status(422).send(errors)
    }
    if(user.password !== user.confirmPassword){
        return res.status(404).send("Passwords are not equal")
    }
    const users = await connectionDB.query(`
        SELECT * FROM users WHERE email = $1
    `, [user.email])
    if(users.rows !== 0){
        res.sendStatus(409)
    }

    res.locals.user = user
    next()
}