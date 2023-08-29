import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { CitySchema } from "../schemas/cities.schemas.js";
import { registerCity } from "../controllers/cities.controller.js";

const citiesRouter = Router();

citiesRouter.post('/cities',validateSchema(CitySchema), registerCity); 

export default citiesRouter;