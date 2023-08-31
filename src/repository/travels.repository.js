import db from "../database/database.connection.js";

export async function createTravelDB(passengerId, flightId) {

    const query = `/* SQL */
         INSERT INTO travels ("passengerId","flightId") VALUES ($1,$2);
        `;
    await db.query(query, [passengerId, flightId]);
    return null;
}

export async function findTravelsDB(name) {
    let query = `/* SQL */
            SELECT passengers."firstName", passengers."lastName", COUNT(travels.id) as travels
            FROM passengers
            LEFT JOIN travels
            ON passengers.id = travels."passengerId"
        `;
    let parameters = []
    if (name) {
        query += '  WHERE passengers."firstName" ILIKE $1';
        parameters.push(`%${name}%`);
    }

    query += ' GROUP BY passengers.id ORDER BY travels DESC;';
    const travels = await db.query(query, parameters);
    return travels.rows;
}

export async function validTravelRequestDB(passengerId, flightId) {

    const query = `/* SQL */
         SELECT CASE
            WHEN EXISTS (
                SELECT *
                FROM passengers
                WHERE id = $1
            ) AND EXISTS (
                SELECT *
                FROM flights
                WHERE id = $2
            )
            THEN 'true'
            ELSE 'false'
        END;
        `;
    const isValid = await db.query(query, [passengerId, flightId]);
    return isValid.rows[0].case == "false" ? false : true;
}