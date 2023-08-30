import db from "../database/database.connection.js";

export async function createTravel(passengerId,flightId) {
    try {
        const query = `/* SQL */
         INSERT INTO travels ("passengerId","flightId") VALUES ($1,$2);
        `;
        await db.query(query,[passengerId,flightId]);
        return null;
    } catch ({message}) {
        console.log(message);
        throw { type: "create_travel", message };
    }
}

export async function findTravels(name) {
    try {
        let query = `/* SQL */
            SELECT passengers."firstName", passengers."lastName", COUNT(travels.id) as travels
            FROM passengers
            LEFT JOIN travels
            ON passengers.id = travels."passengerId"
        `;
        let parameters = []
        if(name){
            query += '  WHERE passengers."firstName" ILIKE $1';
            parameters.push(`%${name}%`);
        }

        query += ' GROUP BY passengers.id ORDER BY travels DESC;';


        const travels = await db.query(query,parameters);
        return travels.rows;
    } catch ({message}) {
        console.log(message);
        throw { type: "invalid_travel_request", message };
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
        console.log(message);
        throw { type: "invalid_travel_request", message };
    }
}