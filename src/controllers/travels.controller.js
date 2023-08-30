import { validTravelRequest } from "../repository/travels.repository.js";

export async function registerTravel(req, res) {
    const {passengerId,flightId} = req.body;
    try {
        const isValidTravel = validTravelRequest(passengerId,flightId);
        if(!isValidTravel) return res.sendStatus(404);
        return res.status(200).send('');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}