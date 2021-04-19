import { ObjectType, Field, createUnionType } from "type-graphql";

export namespace SendEmailResponse {
  @ObjectType()
  export class SendEmailSuccess {
    constructor() {
      this.message = "SEND EMAIL SUCCESSFULLY";
    }
  
    @Field()
    message: string;
  
    static getMessage() {
      return "SEND EMAIL SUCCESSFULLY";
    }
  }
}

const { SendEmailSuccess } = SendEmailResponse;

export const SendEmailResult = createUnionType({
  name: "SendEmailResult",
  types: () => [SendEmailSuccess],
  resolveType: args => {
    switch (args.message) {
      case SendEmailSuccess.getMessage(): {
        return SendEmailSuccess;
      }
      default: {
        return undefined;
      }
    }
  }
});