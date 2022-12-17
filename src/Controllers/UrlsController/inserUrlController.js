import { nanoid } from 'nanoid'
import connectionDB from '../../Database/db.js'

export default async function inserUrl(req, res) {
    const {url} = req.body
    model.id = nanoid()

    try {
        const smallToken = nanoid(8)
        await connectionDB.query(`
            INSERT INTO urls
            ("url", "shortUrl", "creatorId")
            VALUES ($1, $2, $3);
        `, [url, shortUrl, session.userId])
        res.send(smallToken).status(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}