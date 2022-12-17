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
        SELECT * FROM users WHERE email = $1
    `,
    [user.email]
  );
  const passwordValidation = bcrypt.compareSync(
    userSpec.password,
    user.password
  );

  if (userSpec.rows === 0 ||  !passwordValidation) {
    res.status(401).send("Email or password incorrect");
  }
  const sessionOngoing = await connectionDB.query(`
        SELECT * 
        FROM sessions
        WHERE userId = $1
  `, [userSpec.id])
  if(sessionOngoing.rows !== 0 ){
    return res.send(sessionOngoing.token)
  }

  res.locals.user = user;
  next();
}
