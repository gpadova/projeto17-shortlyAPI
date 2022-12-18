import bcrypt from "bcrypt"
import connectionDB from "../../Database/db.js"

export default async function insertUserIntoDB(req, res){
    const {name, password, email} = res.locals.user
    try {
        const hashedPassword = bcrypt.hashSync(password, 10)
        await connectionDB.query(`
            INSERT INTO users
            (name,email, password)
            VALUES ($1, $2, $3);
        `,[name, email, hashedPassword])
        res.sendStatus(201) 
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}