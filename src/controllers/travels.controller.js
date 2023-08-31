import httpStatus from "http-status";
import { createTravel, findTravels, validTravelRequest } from "../repository/travels.repository.js";

export async function registerTravel(req, res) {
    const { passengerId, flightId } = req.body;
    const isValidTravel = await validTravelRequest(passengerId, flightId);
    if (!isValidTravel)  throw { type: "NotFoundError", message: `This travel cant happen!` };
    await createTravel(passengerId, flightId);
    return res.sendStatus(httpStatus.CREATED);
}

export async function getTravels(req, res) {
    const { name } = req.query;
    const travels = await findTravels(name);
    if (travels.length > 10) throw { type: "Internal", message: `Too many results` };
    return res.status(httpStatus.OK).send(travels);
}