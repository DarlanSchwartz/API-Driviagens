import db from "../database/database.connection.js";

export async function createFlight(origin,destination,date) {
    try {

        
    } catch ({message}) {
        throw { type: "create_flights", message };
    }
}

export async function findFlights() {
    try {
        const query=``;
        const flights = await db.query(query);
        return flights.rows;
    } catch ({message}) {
        throw { type: "find_flights", message };
    }
}

export async function findPassengerFlightsCount() {
    try {
        const query=``;
        const flights = await db.query(query);
        return flights.rows;
    } catch ({message}) {
        throw { type: "find_flights", message };
    }
}

