import connectionDB from "../../Database/db.js"

export default async function listHighestLinks(req, res) {
    
    try {
        const ranking = await connectionDB.query(`
            SELECT us.id, us.name,COUNT(c.id), SUM(c.visitCount) 
                FROM urls ur
                    JOIN user us ON ur."userId" = us.id 
                    JOIN counter c ON ur.id = c."urlId"
            GROUP BY us.id
            LIMIT 10
            ORDER BY c."visitCount" DESC
            ;
        `)

        res.send(ranking).status(200)
    } catch (error) {
        console.log(error)
        resizeBy.sendStatus(401)
    }
}

