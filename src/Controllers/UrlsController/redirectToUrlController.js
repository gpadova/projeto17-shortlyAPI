import connectionDB from "../../Database/db.js"

export default async function redirectToShortUrl(req, res) {
    const {shorturl} = req.params
   
    try {
        const fullUrl = await connectionDB.query(`
            SELECT *
            FROM urls
            WHERE "shortUrl"= $1;
        `, [shorturl])
        if(fullUrl.rowCount === 0){
            return res.sendStatus(404)
        }

        const lastCount = await connectionDB.query(`
            SELECT MAX("visitCount") AS maximum_views, id
            FROM counter
            WHERE "urlId" = $1
            GROUP BY id;
        `, [fullUrl.rows[0].id])
        

        let incrementator = (lastCount.rows[0].maximum_views) + 1

        await connectionDB.query(`
            INSERT INTO counter("visitCount","urlId")
            VALUES ($1, $2);
        `, [incrementator, fullUrl.rows[0].id])

        res.redirect(fullUrl.rows[0].url)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}