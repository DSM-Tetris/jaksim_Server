import { createUnionType, Field, ObjectType } from "type-graphql";
import { BadRequest } from "./badRequest";

enum LoginMessage {
  SuccessLogin = "LOGIN SUCCESSFULLY COMPLETE",
  InvalidLoginInfo = "INVALID LOGIN INFO",
}

export namespace LoginResponse {
  @ObjectType()
  export class Login {
    constructor(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.message = LoginMessage.SuccessLogin;
    }

    @Field()
    accessToken!: string;

    @Field()
    refreshToken!: string;

    @Field()
    message!: string;
  }

  @ObjectType()
  export class InvalidLoginInfo {
    constructor() {
      this.message = LoginMessage.InvalidLoginInfo;
    }

    @Field()
    message!: string;
  }
}

const { Login, InvalidLoginInfo } = LoginResponse;

export const LoginResult = createUnionType({
  name: "LoginResult",
  types: () => [Login, InvalidLoginInfo, BadRequest] as const,
  resolveType: (args) => {
    switch (args.message) {
      case LoginMessage.SuccessLogin: {
        return Login;
      }
      case LoginMessage.InvalidLoginInfo: {
        return InvalidLoginInfo;
      }
      case "BAD REQUEST": {
        return BadRequest;
      }
      default: {
        return undefined;
      }
    }
  },
});
