import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { registerTravel } from "../controllers/travels.controller.js";
import { TravelSchema } from "../schemas/travels.schemas.js";

const travelsRouter = Router();

travelsRouter.post('/travels',validateSchema(TravelSchema), registerTravel); 

export default travelsRouter;