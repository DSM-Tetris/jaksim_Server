import Joi from "joi";

export const getPostSchema = Joi.object()
  .keys({
    username: Joi.string().min(6).max(8).alphanum().required(),
    postId: Joi.number().integer().min(1).required(),
  });

export const getPostsSchema = Joi.object()
  .keys({
    username: Joi.string().min(6).max(8).alphanum().required(),
    page: Joi.number().integer().min(1).required(),
  });