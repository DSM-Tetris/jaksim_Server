import Joi from "joi";

export const getPostSchema = Joi.number().integer().min(1).required();

export const getPostsSchema = Joi.object().keys({
  page: Joi.number().integer().min(1).required(),
  categoryId: Joi.number().integer().min(1).optional().allow(null),
});

export const uploadPostSchema = Joi.object().keys({
  title: Joi.string().min(1).max(30).required(),
  content: Joi.string().max(1).max(300).required(),
  categoryId: Joi.number().integer().optional().allow(null),
  tagNames: Joi.array().length(10).optional(),
});

export const pictureSchema = Joi.object()
  .keys({
    filename: Joi.string().required(),
    mimetype: Joi.string()
      .regex(/^image/)
      .required(),
    encoding: Joi.string().required(),
  })
  .optional();
