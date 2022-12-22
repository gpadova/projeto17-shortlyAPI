import connectionDB from "../../Database/db.js";

export default async function listHighestLinks(req, res) {
  try {
    const ranking = await connectionDB.query(`
    SELECT users.id, users.name,
        COUNT(urls.id)::INTEGER as "linksCount",
        COALESCE(SUM(c."visitCount"), 0)::INTEGER as "visitCount"
        FROM users
            LEFT JOIN urls
                ON users.id=urls."userId"
            LEFT JOIN counter c
                ON c."urlId" = urls.id	
            GROUP BY users.id
                ORDER BY "visitCount" DESC
                LIMIT 10;
        `);

    res.send(ranking.rows).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
}