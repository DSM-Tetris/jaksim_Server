import { ObjectType, Field, createUnionType } from "type-graphql";

enum VerifyEmailMessage {
  Success = "EMAIL VERIFICATION SUCCESS",
  Fail = "EMAIL VERIFICATION FAIL"
}

export namespace VerifyEmailResponse {
  @ObjectType()
  export class VerifyEmailSuccess {
    constructor() {
      this.message = VerifyEmailMessage.Success;
    }
  
    @Field()
    message!: string;
  }
  
  @ObjectType()
  export class VerifyEmailFailed {
    constructor() {
      this.message = VerifyEmailMessage.Fail;
    }
  
    @Field()
    message!: string;
  
    static getMessage(): string {
      return VerifyEmailMessage.Fail;
    }
  }
}

const { VerifyEmailSuccess, VerifyEmailFailed } = VerifyEmailResponse;

export const VerifyEmailResult = createUnionType({
  name: "VerifyEmailResult",
  types: () => [VerifyEmailSuccess, VerifyEmailFailed],
  resolveType: args => {
    switch (args.message) {
      case VerifyEmailMessage.Success: {
        return VerifyEmailSuccess;
      }
      case VerifyEmailMessage.Fail: {
        return VerifyEmailFailed;
      }
      default: {
        return undefined;
      }
    }
  }
});