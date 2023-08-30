import { cityExists, createCity } from "../repository/cities.repository.js";

export async function registerCity(req, res) {
    const {name} = req.body;
    try {
        const hasAlreadyACityNamed = await cityExists(name);
        if(hasAlreadyACityNamed) return res.sendStatus(409);
        await createCity(name);
        return res.status(201).send('Created city sucessfully');
    } catch ({message}) {
        throw { type: "create_city", message };
    }
}