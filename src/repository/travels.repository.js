import db from "../database/database.connection.js";

export async function createTravelDB(passengerId, flightId) {
    const query = `/* SQL */
         INSERT INTO travels ("passengerId","flightId") VALUES ($1,$2);
        `;
    await db.query(query, [passengerId, flightId]);
    return null;
}

export async function findTravelsDB(name, offset, postsPerPage,limit) {
    let query = `/* SQL */
            SELECT passengers."firstName", passengers."lastName", COUNT(travels.id) as travels
            FROM passengers
            LEFT JOIN travels
            ON passengers.id = travels."passengerId"
        `;
    let parameters = [];
    if (name) {
        query += '  WHERE passengers."firstName" ILIKE $' + (parameters.length + 1) + `OR passengers."lastName" ILIKE $` + (parameters.length + 1);
        parameters.push(`%${name}%`);
    }

    query += ' GROUP BY passengers.id ORDER BY travels DESC';
    if(limit >= 10 )
    {
        query += ' LIMIT $' + (parameters.length + 1);
        parameters.push(postsPerPage);
    }
    

    if (offset) {
        query += ' OFFSET $' + (parameters.length + 1);
        parameters.push(offset);
    }

    const travels = await db.query(query, parameters);
    const fixedTravels = travels.rows.map(travel => {return {passenger: travel.firstName + " " + travel.lastName, travels:travel.travels}});
    return fixedTravels;
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