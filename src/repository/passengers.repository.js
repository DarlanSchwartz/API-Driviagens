import db from "../database/database.connection.js";

export async function createPassenger(firstName,lastName) {
    try {
        return null;
    } catch ({message}) {
        throw { type: "create_passenger", message };
    }
}
