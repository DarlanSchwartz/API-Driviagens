import httpStatus from "http-status";
import PassengerService from "../services/passengerService.js";

export async function registerPassenger(req, res) {
    await PassengerService.createPassenger(req.body.firstName, req.body.lastName);
    return res.sendStatus(httpStatus.CREATED);
}