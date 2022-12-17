import { urlSchema } from "../../Schemas/urlsSchemas/urlSchema.js";
import connectionDB from "../../Database/db.js";

export default async function validateUrlSchema(req, res, next) {
    const fullUrl = req.body;
    const { error } = urlSchema.validate(fullUrl, { abortEarly: false });
  
    if (error) {
      const errors = error.details.map((det) => det.message);
      return res.status(422).send(errors);
    }
    res.locals.fullUrl = fullUrl
    next()
}