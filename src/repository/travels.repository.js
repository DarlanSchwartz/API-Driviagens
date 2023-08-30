import db from "../database/database.connection.js";

export async function createTravel(passengerId,flightId) {
    try {
        return null;
    } catch ({message}) {
        throw { type: "create_travel", message };
    }
}
