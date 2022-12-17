import connectionDB from "../../Database/db.js"

export default async function redirectToShortUrl(req, res) {
    const {shortUrl} = req.params

    try {
        const fullUrl = await connectionDB.query(`
            SELECT url, visitCount
            FROM urls
            WHERE "shortUrl"= $1;
        `, [shortUrl])
        if(fullUrl.rows === 0){
            return res.sendStatus(404)
        }
        let incrementator = fullUrl.visitCount + 1
        await connectionDB.query(`
            UPDATE INTO urls
            SET visitCount = $1
            WHERE "shortUrl"= $2;
        `, [incrementator, shortUrl])

        res.redirect(fullUrl.url)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}