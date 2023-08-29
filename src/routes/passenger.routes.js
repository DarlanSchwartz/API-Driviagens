import { Router } from "express";
import {  PassengerSchema } from "../schemas/passengers.schemas.js";
import { getPassengersTravels, registerPassenger} from "../controllers/passengers.controller.js";
import validateSchema from "../middlewares/validateSchema.js";

const passengersRouter = Router();

passengersRouter.post('/passengers',validateSchema(PassengerSchema), registerPassenger); 
passengersRouter.get('/passengers/travels', getPassengersTravels); 

export default passengersRouter;