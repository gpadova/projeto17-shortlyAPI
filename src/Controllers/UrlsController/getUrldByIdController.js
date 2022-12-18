import connectionDB from "../../Database/db.js"

export default async function getById(req, res) {
    const {id} = req.params
    try {
        const url = await connectionDB.query(`
            SELECT id, "shortUrl" , "url" 
            FROM urls
            WHERE "userId" = $1;
        `, [id])
        if(url.rowCount === 0){
            return res.sendStatus(404)
        }
        res.send(url.rows).status(200)
    } catch (error) {
        console.log(error)
        resizeBy.sendStatus(401)
    }
}

