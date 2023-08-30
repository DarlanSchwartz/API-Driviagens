import { createPassenger } from "../repository/passengers.repository.js";

export async function registerPassenger(req, res) {
    const { firstName, lastName } = req.body;
    try {
        await createPassenger(firstName, lastName);
        return res.sendStatus(200);
    } catch ({message}) {
        console.log(message);
        throw { type: "create_passenger", message };
    }
}