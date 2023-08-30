import { Router } from "express";
import {  PassengerSchema } from "../schemas/passengers.schemas.js";
import { registerPassenger} from "../controllers/passengers.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import { getTravels } from "../controllers/travels.controller.js";

const passengersRouter = Router();

passengersRouter.post('/passengers',validateSchema(PassengerSchema), registerPassenger); 
passengersRouter.get('/passengers/travels', getTravels); 

export default passengersRouter;