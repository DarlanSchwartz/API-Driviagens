import { getCityIdDB } from "../repository/cities.repository.js";
import { createFlightDB, findFlightsDB, validFlightLocationsDB } from "../repository/flights.repository.js";
import { dateBiggerThan, dateBiggerThanFormatBoth, formatDate, isValidDateFormat } from "./dateServices.js";

async function createFlight(origin,destination,date){
    if (origin == destination) throw { type: "ConflictError", message: `You cannot fly from ${origin} to ${destination}` };
    if (!dateBiggerThan(date, new Date())) throw { type: "Unprocessable", message: `You cannot register flights with a date on the past, you Moron!` };
    const isValidFlight = await validFlightLocationsDB(origin, destination);
    if (!isValidFlight) throw { type: "NotFoundError", message: `You cannot register flights with a date on the past, you Moron!` };
    const flight  = await createFlightDB(origin, destination, formatDate(date));
    return flight;
}

async function findFlights(biggerDate, smallerDate, origin, destination) {
    if (biggerDate && !smallerDate || smallerDate && !biggerDate) throw { type: "Unprocessable", message: `You cannot ask for flights with only smaller or bigger date, you have to pass both` };
    if (smallerDate && !isValidDateFormat(smallerDate)) throw { type: "Unprocessable", message: `Invalid smaller date format, correct is DD-MM-YYYY` };
    if (biggerDate && !isValidDateFormat(biggerDate)) throw { type: "Unprocessable", message: `Invalid bigger date format, correct is DD-MM-YYYY` };
    if (smallerDate && biggerDate && dateBiggerThanFormatBoth(smallerDate, biggerDate)) throw { type: "BadRequest", message: `Smaller date has to be a date before (smaller) the bigger date!` };

    let originId = null;
    let destinationId = null;
    if (origin) originId = await getCityIdDB(origin);
    if (destination) destinationId = await getCityIdDB(destination);
    const flights = await findFlightsDB(originId, destinationId, smallerDate ? formatDate(smallerDate) : null, biggerDate ? formatDate(biggerDate) : null);
    if (origin && destination && flights.length == 0) throw { type: "NotFoundError", message: `No flights found for ${origin} to ${destination}` };
    return flights;
}

const FlightService = {createFlight,findFlights}

export default FlightService;