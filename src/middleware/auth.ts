import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { context } from "../context";
import config from "../config";
import { Unauthorized } from "../dto";

const extractBearerToken = (bearerToken: string): string => {
  return bearerToken.split("Bearer ")[1];
};

const verifyToken = (token: string) => {
  try {
    return verify(token, config.JWT_SECRET);
  } catch (e) {
    return new Unauthorized();
  }
};

export const auth: MiddlewareFn = async (_, next) => {
  if (!context.token) {
    return new Unauthorized();
  }

  context.decoded = verifyToken(extractBearerToken(context.token));

  return await next();
};
