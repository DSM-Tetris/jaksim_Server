import Joi from "joi";

export const usernameSchema = Joi.string().min(6).max(8).alphanum().required();