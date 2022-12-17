//importar o DB

export default async function deleteUrl(req, res) {
  try {
    const userTotalViews = await connectionDB.query(
      `
            SELECT ur.id, ur.name, SUM("visitCount"), c."visitCount"
            FROM urls ur
                JOIN users us
                    ON us.id = ur."creatorId"
                JOIN counter c
                    ON c."urlId" = ur.id
                GROUP BY c."visitCount"    
            WHERE "creatorId" = $1;
        `,
      [session.userId]
    );

    res.send(userTotalViews);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
