import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { FlightSchema } from "../schemas/flights.schemas.js";
import { getFlights, registerFlight } from "../controllers/flights.controller.js";

const flightsRouter = Router();

flightsRouter.post('/flights',validateSchema(FlightSchema), registerFlight); 
flightsRouter.get('/flights', getFlights); 

export default flightsRouter;