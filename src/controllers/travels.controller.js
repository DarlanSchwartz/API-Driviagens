import { createTravel, findTravels, validTravelRequest } from "../repository/travels.repository.js";

export async function registerTravel(req, res) {
    const {passengerId,flightId} = req.body;
    try {
        const isValidTravel = await validTravelRequest(passengerId,flightId);
        if(!isValidTravel) return res.sendStatus(404);
        await createTravel(passengerId,flightId);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}

export async function getTravels(req, res) {
    const {name} = req.query;
    try {
        const travels = await findTravels(name);
        if(travels.length > 10) return res.status(500).send("Too many results");
        return res.status(200).send(travels);
    } catch ({message}) {
        console.log(message);
        throw { type: "get_passenger_travels", message };
    }
}