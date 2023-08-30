import db from "../database/database.connection.js";

export async function createPassenger(firstName,lastName) {
    try {
        const query = `/* SQL */
            INSERT INTO passengers ('fisrtName','lastName')
            VALUES ($1, $2);
        `;
        const newUser = await db.query(query,[firstName,lastName]);
        return newUser.rows;
    } catch ({message}) {
        throw { type: "create_passenger", message };
    }
}