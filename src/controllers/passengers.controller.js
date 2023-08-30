import { createPassenger } from "../repository/passengers.repository.js";

export async function getPassengersTravels(req, res) {
    try {
        return res.status(200).send('');
    } catch ({message}) {
        throw { type: "get_passenger_travels", message };
    }
}

export async function registerPassenger(req, res) {
    const { firstName, lastName } = req.body;
    try {
        await createPassenger(firstName, lastName);
        return res.sendStatus(200);
    } catch ({message}) {
        throw { type: "create_passenger", message };
    }
}