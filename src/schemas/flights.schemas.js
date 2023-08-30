import joi from 'joi';

export const FlightSchema = joi.object({
    origin: joi.number().integer().required(),
    destination: joi.number().integer().required(),
    date: joi.string().pattern(new RegExp(/^\d{2}-\d{2}-\d{4}$/)).required()
})