import db from "../database/database.connection.js";

export async function createFlight(origin,destination,date) {
    try {
        const query=`INSERT INTO flights (origin,destination,date) VALUES($1,$2,$3);`;
        const flights = await db.query(query,[origin,destination,date]);
        return flights.rows;
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

export async function validFlightLocations(fromId,toId) {
    try {
        const query = `/* SQL */
            SELECT COUNT(*) FROM cities WHERE id IN ($1, $2);
        `;
        const city = await db.query(query,[fromId,toId]);
        return city.rows[0].count > 1;
    } catch ({message}) {
        throw { type: "create_city", message };
    }
}