import connectionDB from "../../Database/db.js";

export default async function getUsersCount(req, res) {
  const session = res.locals.session;
  try {
    const userTotalViews = await connectionDB.query(
      `
      SELECT us.id, us.name, SUM("visitCount") AS visitCount, ur.id,
      json_build_object(
        'id', ur.id,
        'shortUrl', ur."shortUrl",
        'url', ur.url,
        'visitCount', c."visitCount"
      ) AS "shortnedUrls"
      FROM urls ur
          JOIN users us
              ON us.id = ur."userId"
          JOIN counter c
              ON c."urlId" = ur.id
            WHERE ur."userId" = $1	
        GROUP BY ur.id, us.id, c."visitCount";  
      ;
        `,
      [session.rows[0].userId]
    );

    res.send(userTotalViews.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
