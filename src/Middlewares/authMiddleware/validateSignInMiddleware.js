import { signInSchema } from "../../Schemas/authSchemas/validateSignInBodySchema.js";
import bcrypt from "bcrypt";
import connectionDB from "../../Database/db.js";

export default async function validateSignInBody(req, res, next) {
  const user = req.body;
  const { error } = signInSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((det) => det.message);
    return res.status(422).send(errors);
  }

  const userSpec = await connectionDB.query(
    `
        SELECT * 
        FROM users 
        WHERE email = $1;
    `,
    [user.email]
  );

  if (userSpec.rowCount === 0) {
    return res.status(401).send("Email or password incorrect");
  }

  const passwordValidation = bcrypt.compareSync(
    userSpec.rows[0].password,
    user.password
  );

  if (passwordValidation) {
    return res.status(401).send("Email or password incorrect");
  }
  const sessionOngoing = await connectionDB.query(`
        SELECT * 
        FROM sessions
        WHERE "userId" = $1;
  `, [userSpec.rows[0].id])
 
  if(sessionOngoing.rowCount !== 0 ){
    return res.send(sessionOngoing.rows[0].token)
  }

  res.locals.userSpec = userSpec;
  next();
}
