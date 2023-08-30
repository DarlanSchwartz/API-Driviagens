import db from "../database/database.connection.js";

export async function createFlight(origin,destination,date) {
    try {
        const query=`INSERT INTO flights (origin,destination,date) VALUES($1,$2,$3);`;
        const flights = await db.query(query,[origin,destination,date]);
        return flights.rows;
    } catch ({message}) {
        console.log(message);
        throw { type: "create_flights", message };
    }
}


    //{ id: 2, origin: "Salvador", destination: "Fortaleza", date: "27-07-2023"},
    //{ id: 1, origin: "São Paulo", destination: "Rio de Janeiro", date: "24-12-2023"}

    export async function findFlights(origin, destination, smaller_date, bigger_date) {
        try {
            let query = `
            SELECT flights.id, origin.name AS origin, destination.name AS destination, date
            FROM flights
            JOIN cities AS origin ON flights.origin = origin.id
            JOIN cities AS destination ON flights.destination = destination.id
        `;
            const queryParams = [];
    
            if (origin || destination || (smaller_date && bigger_date)) {
                query += ' WHERE ';
            }
            if (origin) {
                query += 'origin = $1';
                queryParams.push(origin);
            }
            if (destination) {
                if (queryParams.length > 0) {
                    query += ' AND ';
                }
                query += 'destination = $' + (queryParams.length + 1);
                queryParams.push(destination);
            }
            if (smaller_date && bigger_date) {
                if (queryParams.length > 0) {
                    query += ' AND ';
                }
                query += 'date >= $' + (queryParams.length + 1) + ' AND date <= $' + (queryParams.length + 2);
                queryParams.push(smaller_date, bigger_date);
            }

            query += ' ORDER BY date ASC';
            
            const flights = await db.query(query, queryParams);

            if (flights.rows.length === 0) return [];

            return flights.rows;
        } catch ({ message }) {
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