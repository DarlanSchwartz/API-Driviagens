import db from "../database/database.connection.js";

export async function userExists(email) {
    try {
        return true;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
