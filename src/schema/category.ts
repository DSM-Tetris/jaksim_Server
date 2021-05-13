import Joi from "joi";

export const categoryNameSchema = Joi.string().min(1).max(20).required();