import httpStatus from "http-status";
import FlightService from "../services/flightServices.js";

export async function registerFlight(req, res) {
    const { origin, destination, date } = req.body;
    await FlightService.createFlight(origin, destination, date);
    return res.sendStatus(httpStatus.CREATED);
}

export async function getFlights(req, res) {
    const { origin, destination, } = req.query;
    const smallerDate = req.query['smaller-date'];
    const biggerDate = req.query['bigger-date'];
    const flights = await FlightService.findFlights(biggerDate, smallerDate, origin, destination);
    return res.status(httpStatus.OK).send(flights);
}