import db from "../database/database.connection.js";

export async function createCity(name) {
    try {
        return null;
    } catch ({message}) {
        throw { type: "create_city", message };
    }
}