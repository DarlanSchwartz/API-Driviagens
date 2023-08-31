import httpStatus from "http-status";
import { cityExists, createCity } from "../repository/cities.repository.js";

export async function registerCity(req, res) {
    const { name } = req.body;
    const hasAlreadyACityNamed = await cityExists(name);
    if (hasAlreadyACityNamed) throw { type: "ConflictError", message: `There is alread a city named ${name}.` };
    await createCity(name);
    return res.status(httpStatus.CREATED).send('Created city sucessfully');
}