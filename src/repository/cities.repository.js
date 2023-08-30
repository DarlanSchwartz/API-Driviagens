import db from "../database/database.connection.js";

export async function createCity(name) {
    try {
        const query = `/* SQL */
            INSERT INTO cities (name)
            VALUES ($1);
        `;
        const newCity = await db.query(query,[name]);
        return newCity.rows;
    } catch ({message}) {
        throw { type: "create_city", message };
    }
}

export async function cityExists(name) {
    try {
        const query = `/* SQL */
            SELECT 1 FROM cities WHERE name = $1;
        `;
        const city = await db.query(query,[name]);
        return city.rows > 0;
    } catch ({message}) {
        throw { type: "create_city", message };
    }
}

