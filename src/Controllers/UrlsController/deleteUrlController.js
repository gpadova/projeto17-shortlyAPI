import connectionDB from "../../Database/db.js";

export default async function deleteUrl(req, res) {
  const { id } = req.params;
  const session = res.locals.session;
  try {
    const deletingUrl = await connectionDB.query(
      `
            SELECT * 
            FROM urls
            WHERE id = $1
        `,
      [id]
    );

    if (deletingUrl.userId !== session.userId) {
      return res.sendStatus(401);
    }

    await connectionDB.query(
      `
        DELETE FROM counter
        WHERE "urlId" = $1;
    `,
      [id]
    );

    await connectionDB.query(
      `
            DELETE FROM urls
            WHERE "id" = $1;
        `,
      [id]
    );

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
