import { ObjectType, Field, createUnionType } from "type-graphql";
import { BadRequest } from "./badRequest";
import { VerifyEmailResponse } from "./verifyEmail";

enum ModifyPasswordMessage {
  ModifyPasswordSuccess = "MODIFY PASSWORD SUCCESS",
  UserNotExists = "USER NOT EXISTS",
}

export namespace ModifyPasswordResponse {
  @ObjectType()
  export class ModifyPassword {
    constructor() {
      this.message = ModifyPasswordMessage.ModifyPasswordSuccess;
    }

    @Field()
    message: string;
  }

  @ObjectType()
  export class UserNotExists {
    constructor() {
      this.message = ModifyPasswordMessage.UserNotExists;
    }

    @Field()
    message: string;
  }
}

const { ModifyPassword, UserNotExists } = ModifyPasswordResponse;

export const ModifyPasswordResult = createUnionType({
  name: "ModifyPasswordResult",
  types: () => [ModifyPassword, UserNotExists, BadRequest, VerifyEmailResponse.VerifyEmailFailed] as const,
  resolveType: args => {
    switch (args.message) {
      case ModifyPasswordMessage.ModifyPasswordSuccess: {
        return ModifyPassword;
      }
      case BadRequest.getMessage(): {
        return BadRequest;
      }
      case ModifyPasswordMessage.UserNotExists: {
        return UserNotExists;
      }
      case VerifyEmailResponse.VerifyEmailFailed.getMessage(): {
        return VerifyEmailResponse.VerifyEmailFailed;
      }
      default: {
        return undefined;
      }
    }
  },
});