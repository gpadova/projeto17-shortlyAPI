import { Router } from "express";
import validateUrlSchema from "../Middlewares/urlMiddlewares/validateSchemaMiddleware.js";
import tokenChecker from "../Controllers/tokenController.js";
import inserUrl from "../Controllers/UrlsController/inserUrlController.js";
import getById from "../Controllers/UrlsController/getUrldByIdController.js";
import redirectToShortUrl from "../Controllers/UrlsController/redirectToUrlController.js";
import deleteUrl from "../Controllers/UrlsController/deleteUrlController.js";

const urlsRouter = Router()

urlsRouter.post("/urls/shorten",tokenChecker,validateUrlSchema, inserUrl)
urlsRouter.get("/urls/:id", getById)
urlsRouter.get("/urls/open/:shortUrl", redirectToShortUrl)
urlsRouter.delete("/urls/:id", tokenChecker, deleteUrl)

export default urlsRouter

