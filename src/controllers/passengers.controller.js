import httpStatus from "http-status";
import { createPassenger } from "../repository/passengers.repository.js";

export async function registerPassenger(req, res) {
    const { firstName, lastName } = req.body;
    await createPassenger(firstName, lastName);
    return res.sendStatus(httpStatus.CREATED);
}