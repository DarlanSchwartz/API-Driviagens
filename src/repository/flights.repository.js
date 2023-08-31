import db from "../database/database.connection.js";

export async function createFlight(origin, destination, date) {
    const query = `INSERT INTO flights (origin,destination,date) VALUES($1,$2,$3);`;
    const flights = await db.query(query, [origin, destination, date]);
    return flights.rows;

}
export async function findFlights(origin, destination, smaller_date, bigger_date) {
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
}


export async function validFlightLocations(fromId, toId) {
    const query = `/* SQL */
            SELECT COUNT(*) FROM cities WHERE id IN ($1, $2);
        `;
    const city = await db.query(query, [fromId, toId]);
    return city.rows[0].count > 1;
}