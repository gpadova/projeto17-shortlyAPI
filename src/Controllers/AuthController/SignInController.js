import { v4 as uuid } from 'uuid';
//importar o banco de dados quando criado

export default async function confirmSignIn(params) {
    try {
        const token = uuid()
        await connectionDB.query(`
            UPDATE sesseios
            SET token = $1
            WHERE userId = $2
        `, [token, user.id])

        res.send(token).status(200)
    } catch (error) {
        console.log(error)
        resizeBy.sendStatus(500)
    }
}