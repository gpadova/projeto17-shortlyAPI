import connectionDB from "../../Database/db.js"

export default async function deleteUrl(req, res) {
    const {id} = req.params
    try {
        const deletingUrl = await connectionDB.query(`
            SELECT * 
            FROM urls
            WHERE id = $1
        `, [id])

        if(deletingUrl.creatorId !== sessionStorage.userId){
            return res.sendStatus(401)
        }

        await connectionDB.query(`
            DELETE FROM urls
            WHERE creatorId = $1;
        `, session.userId)

        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}