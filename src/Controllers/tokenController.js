import connectionDB from "../Database/db.js";

export default async function tokenChecker(req,res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(!token){
        res.sendStatus(401)
    }

    const session = await connectionDB.query(`
        SELECT * 
        FROM sessions
        WHERE token = $1;
    `, [token])

    if(session.rowCount === 0){
        return res.sendStatus(401)
    }
    res.locals.session = session
    next()
}