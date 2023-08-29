import joi from 'joi';

export const TravelSchema = joi.object({
    passengerId: joi.number().integer().required(),
    flightId: joi.number().integer().required()
})