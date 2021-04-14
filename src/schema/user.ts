import Joi from "joi";

export const signupSchema = Joi.object()
  .keys({
    username: Joi.string().min(6).max(8).alphanum().required(),
    password: Joi.string().min(8).max(20)
      .regex(/^(?=.*\d)(?=.*[A-Za-z])[~`!@#$%^&*()_+\-=\[\]\\|;':",./<>?a-zA-Z0-9]{8,20}$/).required(),
    email: Joi.string().email().max(25).required(),
    nickname: Joi.string().min(2).max(6).regex(/^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,6}$/).required(),
    authCode: Joi.string().length(6).regex(/^[0-9]{6}$/).required()
  });