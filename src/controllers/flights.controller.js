import dayjs from "dayjs";
import { getCityId } from "../repository/cities.repository.js";
import { createFlight, findFlights, validFlightLocations } from "../repository/flights.repository.js";
import { isValidDateFormat, dateBiggerThan, dateBiggerThanFormatBoth, formatDate } from "../services/dateServices.js";
import httpStatus from "http-status";

export async function registerFlight(req, res) {
    const { origin, destination, date } = req.body;
    if (origin == destination) throw { type: "ConflictError", message: `You cannot fly from ${origin} to ${destination}` };
    if (!dateBiggerThan(date, new Date())) throw { type: "Unprocessable", message: `You cannot register flights with a date on the past, you Moron!` };
    const isValidFlight = await validFlightLocations(origin, destination);
    if (!isValidFlight) throw { type: "NotFoundError", message: `You cannot register flights with a date on the past, you Moron!` };
    await createFlight(origin, destination, formatDate(date));
    return res.sendStatus(httpStatus.CREATED);
}

export async function getFlights(req, res) {
    const { origin, destination, } = req.query;
    const smallerDate = req.query['smaller-date'];
    const biggerDate = req.query['bigger-date'];

    if (biggerDate && !smallerDate || smallerDate && !biggerDate) throw { type: "Unprocessable", message: `You cannot ask for flights with only smaller or bigger date, you have to pass both` };
    if (smallerDate && !isValidDateFormat(smallerDate)) throw { type: "Unprocessable", message: `Invalid smaller date format, correct is DD-MM-YYYY` };
    if (biggerDate && !isValidDateFormat(biggerDate)) throw { type: "Unprocessable", message: `Invalid bigger date format, correct is DD-MM-YYYY` };
    if (smallerDate && biggerDate && dateBiggerThanFormatBoth(smallerDate, biggerDate)) throw { type: "BadRequest", message: `Smaller date has to be a date before (smaller) the bigger date!` };

    let originId = null;
    let destinationId = null;
    if (origin) originId = await getCityId(origin);
    if (destination) destinationId = await getCityId(destination);
    const flights = await findFlights(originId, destinationId, smallerDate ? formatDate(smallerDate) : null, biggerDate ? formatDate(biggerDate) : null);
    if (origin && destination && flights.length == 0) throw { type: "NotFoundError", message: `No flights found for ${origin} to ${destination}` };
    return res.status(httpStatus.OK).send(flights);
}