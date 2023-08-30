import db from "../database/database.connection.js";

export async function createTravel(passengerId,flightId) {
    try {
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
        console.log(isValid);
        return isValid.rows[0];
    } catch ({message}) {
        throw { type: "invalid_travel_request", message };
    }
}