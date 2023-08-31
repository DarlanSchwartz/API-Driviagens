import { cityExistsDB, createCityDB } from "../repository/cities.repository.js";

async function createCity(name){
    const hasAlreadyACityNamed = await cityExistsDB(name);
    if (hasAlreadyACityNamed) throw { type: "ConflictError", message: `There is alread a city named ${name}.` };
    const city = await createCityDB(name);
    return city;
}

const CityService = {createCity}

export default CityService;