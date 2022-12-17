import { Router } from "express";
import listHighestLinks from "../Controllers/RankingsController/listHighestLinksController.js";


const rankingRoute = Router()

rankingRoute.get("/ranking", listHighestLinks)

export default rankingRoute