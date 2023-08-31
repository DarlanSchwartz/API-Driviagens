import db from "../database/database.connection.js";

export async function createCityDB(name) {
    const query = `/* SQL */
            INSERT INTO cities (name)
            VALUES ($1);
        `;
    const newCity = await db.query(query, [name]);
    return newCity.rows;
}

export async function cityExistsDB(name) {
    const query = `/* SQL */
            SELECT 1 FROM cities WHERE name = $1;
        `;
    const city = await db.query(query, [name]);
    return city.rows.length > 0;
}

export async function getCityIdDB(name) {
    if (!name || name == "") return null;
    const query = 'SELECT id FROM cities WHERE name = $1';
    const result = await db.query(query, [name]);
    const response = result.rows[0] ? result.rows[0].id : -420;
    return response;
}

