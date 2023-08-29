import { Router } from "express";
import passengersRouter from "./passenger.routes.js";
import flightsRouter from "./flights.routes.js";
import citiesRouter from "./cities.routes.js";
import travelsRouter from "./travels.routes.js";

const router = Router();

router.use(passengersRouter);
router.use(flightsRouter);
router.use(citiesRouter);
router.use(travelsRouter);


export default router;