import { v4 as uuid } from 'uuid';
import connectionDB from '../../Database/db.js';

export default async function confirmSignIn() {
    try {
        const token = uuid()
        await connectionDB.query(`
            INSERT INTO sessions
            (token, userId)
            VALUES ($1,$2);
        `, [token, user.id])

        res.send(token).status(200)
    } catch (error) {
        console.log(error)
        resizeBy.sendStatus(500)
    }
}