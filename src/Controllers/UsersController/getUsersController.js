import connectionDB from "../../Database/db.js";

export default async function getUsersCount(req, res) {
  const session = res.locals.session;
  let visitCount = 0;
  try {
    const userInfo = await connectionDB.query(
      `
      SELECT id, name FROM users WHERE id = $1`,
      [session.rows[0].userId]
    );
    const urlInfo = await connectionDB.query(
      `
      SELECT u.id, u."shortUrl", u.url, MAX(c."visitCount") AS "visitCount" 
      FROM urls u
      JOIN counter c
        ON u.id = c."urlId"
      WHERE u."userId" = $1
      GROUP BY u.id`,
      [session.rows[0].userId]
    );
    urlInfo.rows.map(inf => {
      visitCount += inf.visitCount
    })

    const objToBeSent = [{
      id : userInfo.rows[0].id,
      name : userInfo.rows[0].name,
      visitCount,
      shortnedUrls: urlInfo.rows
    }]

    res.send(objToBeSent);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
