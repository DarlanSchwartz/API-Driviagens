import dayjs from "dayjs";
import { getCityId } from "../repository/cities.repository.js";
import { createFlight, findFlights, validFlightLocations } from "../repository/flights.repository.js";
import { isValidDateFormat, dateBiggerThan, dateBiggerThanFormatBoth } from "../services/dateServices.js";

export async function registerFlight(req, res) {
    const { origin, destination, date } = req.body;
    if (origin == destination) return res.sendStatus(409);
    if (!dateBiggerThan(date, new Date())) return res.status(422).send('WHO DO YOU THINK YOU ARE?!');
    const partesData = date.split("-");
    const formatedReceivedDate = new Date(partesData[2], partesData[1] - 1, partesData[0]);
    try {
        const isValidFlight = await validFlightLocations(origin, destination);
        if (!isValidFlight) return res.sendStatus(404);
        
        await createFlight(origin, destination, formatedReceivedDate);
        return res.sendStatus(201);
    }  catch ({message}) {
        console.log(message);
        throw { type: "create_flight", message };
    }
}

export async function getFlights(req, res) {
    const { origin, destination, } = req.query;
    const smallerDate = req.query['smaller-date'];
    const biggerDate = req.query['bigger-date'];

    if (biggerDate && !smallerDate || smallerDate && !biggerDate) return res.sendStatus(422);
    if (smallerDate && !isValidDateFormat(smallerDate)) return res.sendStatus(422);
    if (biggerDate && !isValidDateFormat(biggerDate)) return res.sendStatus(422);
    if (smallerDate && biggerDate && !dateBiggerThanFormatBoth(smallerDate, biggerDate)) return res.sendStatus(400);

    try {
        let originId = null;
        let destinationId = null;
        if (origin) {
            originId = await getCityId(origin);
        }
        if (destination) {
            destinationId = await getCityId(destination);
        }
        const flights = await findFlights(originId, destinationId, smallerDate ? smallerDate : null, biggerDate ? biggerDate : null);
        return res.status(200).send(flights);
    } catch ({message}) {
        throw { type: "get_flights", message };
    }
}