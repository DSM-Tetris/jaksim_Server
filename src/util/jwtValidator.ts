import * as jwt from "jsonwebtoken";
import config from "../config";

export class JwtValidator {
  static decode(token: string) {
    try {
      return jwt.verify(token, config.JWT_SECRET, { ignoreExpiration: false });
    } catch {
      return null;
    }
  }

  static verify(token: string) {
    try {
      return jwt.verify(token, config.JWT_SECRET);
    } catch {
      return null;
    }
  }
}
