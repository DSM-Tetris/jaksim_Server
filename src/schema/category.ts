import Joi from "joi";

export const categoryNameSchema = Joi.string().min(1).max(20).required();

export const modifyCategorySchema = Joi.object().keys({
  id: Joi.number().integer().min(1).required(),
  categoryName: Joi.string().min(1).max(20).required(),
});