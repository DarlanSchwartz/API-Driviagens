import db from "../database/database.connection.js";

export async function createPassengerDB(firstName, lastName) {
    const query = `/* SQL */
            INSERT INTO passengers ("firstName","lastName")
            VALUES ($1, $2);
        `;
    const newUser = await db.query(query, [firstName, lastName]);
    return newUser.rows;
}