import db from "../database/database.connection.js";

export async function createTravel(passengerId,flightId) {
    try {
        const query = `/* SQL */
         INSERT INTO travels ("passengerID","flightId") VALUES ($1,$2);
        `;
        await db.query(query,[passengerId,flightId]);
        return null;
    } catch ({message}) {
        throw { type: "create_travel", message };
    }
}

export async function validTravelRequest(passengerId,flightId) {
    try {
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
        const isValid = await db.query(query,[passengerId,flightId]);
        return isValid.rows[0].case == "false" ? false : true;
    } catch ({message}) {
        throw { type: "invalid_travel_request", message };
    }
}