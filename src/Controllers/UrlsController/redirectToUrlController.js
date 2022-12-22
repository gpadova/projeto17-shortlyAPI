import connectionDB from "../../Database/db.js";

export default async function redirectToShortUrl(req, res) {
  const { shorturl } = req.params;

  try {
    const fullUrl = await connectionDB.query(
      `
            SELECT *
            FROM urls
            WHERE "shortUrl"= $1;
        `,
      [shorturl]
    );
    if (fullUrl.rowCount === 0) {
      return res.sendStatus(404);
    }

    const lastCount = await connectionDB.query(
      `
        SELECT c."visitCount" , id
        FROM counter c
           WHERE "urlId" = $1
         ORDER BY "visitCount" DESC
         LIMIT 1;
        `,
      [fullUrl.rows[0].id]
    );

    let incrementator = Number(lastCount.rows[0].visitCount) + 1;
    await connectionDB.query(
      `
            INSERT INTO counter("visitCount","urlId")
            VALUES ($1, $2);
        `,
      [incrementator, fullUrl.rows[0].id]
    );
    

    res.redirect(fullUrl.rows[0].url);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
