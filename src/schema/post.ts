import Joi from "joi";

export const getPostSchema = Joi.object().keys({
  username: Joi.string().min(6).max(8).alphanum().required(),
  postId: Joi.number().integer().min(1).required(),
});

export const getPostsSchema = Joi.object().keys({
  username: Joi.string().min(6).max(8).alphanum().required(),
  page: Joi.number().integer().min(1).required(),
  categoryId: Joi.number().integer().min(1),
});

export const uploadPostSchema = Joi.object().keys({
  title: Joi.string().min(1).max(30).required(),
  content: Joi.string().max(1).max(300).required(),
  categoryId: Joi.number().integer().optional(),
  tagNames: Joi.array().optional(),
});
