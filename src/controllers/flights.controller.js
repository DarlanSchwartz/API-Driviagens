import { createFlight, validFlightLocations } from "../repository/flights.repository.js";

export async function registerFlight(req, res) {
    const { origin, destination, date } = req.body;
    if(origin == destination) return res.sendStatus(409);
    const partesData = date.split("-");
    const dataRecebida = new Date(partesData[2], partesData[1] - 1, partesData[0]);
    const dataAtual = new Date();
    if (dataRecebida <= dataAtual) return res.sendStatus(422);

    try {
        const isValidFlight = await validFlightLocations(origin,destination);
        if(!isValidFlight) return res.sendStatus(404);
        await createFlight(origin,destination,date);
        return res.status(200).send('');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}

export async function getFlights(req, res) {
    const {origin} = req.query;
    
	//{ id: 2, origin: "Salvador", destination: "Fortaleza", date: "27-07-2023"},
	//{ id: 1, origin: "São Paulo", destination: "Rio de Janeiro", date: "24-12-2023"}

    try {
        return res.status(200).send('');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}