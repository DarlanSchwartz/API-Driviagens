import { Router } from "express";
import { getPassengersTravels, registerPassenger} from "../controllers/passengers.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import { FlightSchema } from "../schemas/flights.schemas.js";

const flightsRouter = Router();

flightsRouter.post('/flights',validateSchema(FlightSchema), registerPassenger); 
flightsRouter.get('/flights', getPassengersTravels); 

export default flightsRouter;