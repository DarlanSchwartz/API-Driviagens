import joi from 'joi';

export const CitySchema = joi.object({
    name:joi.string().min(2).max(50).required(),
})