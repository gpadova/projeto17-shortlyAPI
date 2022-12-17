import bcrypt from "bcrypt"

export default async function insertUserIntoDB(req, res){
    try {
        const hashedPassword = bcrypt.hashSync(user.password, 10)
        await connectionDB.query(`
            INSERT INTO users
            (name,email, password)
            VALUES ($1, $2, $3, $4)
        `[user.name, user.email, hashedPassword])
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}