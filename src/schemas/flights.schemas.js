import joi from 'joi';

export const FlightSchema = joi.object({
    origin: joi.number().integer().required(),
    destination: joi.number().integer().required(),
    date: joi.date().required()
})