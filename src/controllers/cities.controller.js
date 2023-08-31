import httpStatus from "http-status";
import CityService from "../services/citiesServices.js";

export async function registerCity(req, res) {
    await CityService.createCity(req.body.name);
    return res.status(httpStatus.CREATED).send('Created city sucessfully');
}