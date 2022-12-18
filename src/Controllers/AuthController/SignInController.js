import { v4 as uuid } from 'uuid';
import connectionDB from '../../Database/db.js';

export default async function confirmSignIn(req, res) {
    const userSpec = res.locals.userSpec;
    try {
        const token = uuid()
        await connectionDB.query(`
            INSERT INTO sessions
            (token, "userId")
            VALUES ($1,$2);
        `, [token, userSpec.rows[0].id])

        res.send(token)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}