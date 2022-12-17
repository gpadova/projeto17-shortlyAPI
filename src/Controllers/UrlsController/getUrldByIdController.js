import connectionDB from "../../Database/db.js"

export default async function getById(req, res) {
    const {id} = req.params
    try {
        const url = await connectionDB.query(`
            SELECT id, "url", "shortUrl" 
            FROM urls
            WHERE id = $1;
        `, [id])
        if(url.rows === 0){
            return res.sendStatus(404)
        }

        res.send(url).status(200)
    } catch (error) {
        console.log(error)
        resizeBy.sendStatus(401)
    }
}

