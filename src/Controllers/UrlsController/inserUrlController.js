import { nanoid } from 'nanoid'
import connectionDB from '../../Database/db.js'

export default async function inserUrl(req, res) {
    const {url} = req.body
    const session = res.locals.session
    try {
        const smallToken = nanoid(8)
        const urlId = await connectionDB.query(`
            INSERT INTO urls("url", "shortUrl", "userId")
            VALUES ($1, $2, $3)
            RETURNING ID;
        `, [url, smallToken, session.rows[0].userId])

        await connectionDB.query(`
        INSERT INTO counter
        ("visitCount", "urlId")
        VALUES ($1, $2);
    `, [0, urlId.rows[0].id])
        res.json({shortUrl : smallToken}).status(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}