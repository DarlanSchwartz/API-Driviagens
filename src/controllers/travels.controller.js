import httpStatus from "http-status";
import { findTravelsDB } from "../repository/travels.repository.js";
import TravelService from "../services/travelServices.js";

export async function registerTravel(req, res) {
    const { passengerId, flightId } = req.body;
    await TravelService.registerTravel(passengerId,flightId);
    return res.sendStatus(httpStatus.CREATED);
}

export async function getTravels(req, res) {
    const { name } = req.query;
   const travels = await TravelService.getTravels(name);
    return res.status(httpStatus.OK).send(travels);
}