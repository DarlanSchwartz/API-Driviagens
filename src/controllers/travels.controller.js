import { createTravel, validTravelRequest } from "../repository/travels.repository.js";

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