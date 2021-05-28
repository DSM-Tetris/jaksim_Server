import { createUnionType, Field, ObjectType } from "type-graphql";
import { Unauthorized } from "./unauthorized";

enum GetGreenStatusMessage {
  SuccessGetGreenStatus = "SUCCESS GET GREEN STATUS",
}

export namespace GetGreenStatusResponse {
  @ObjectType()
  export class GetGreenStatus {
    constructor(isGreen: boolean) {
      this.message = GetGreenStatusMessage.SuccessGetGreenStatus;
      this.isGreen = isGreen;
    }

    @Field()
    message: string;

    @Field()
    isGreen: boolean;
  }
}

const { GetGreenStatus } = GetGreenStatusResponse;

export const GetGreenStatusResult = createUnionType({
  name: "GetGreenStatusResult",
  types: () => [GetGreenStatus, Unauthorized],
  resolveType: (args) => {
    switch (args.message) {
      case GetGreenStatusMessage.SuccessGetGreenStatus: {
        return GetGreenStatus;
      }
      case Unauthorized.getMessage(): {
        return Unauthorized;
      }
      default: {
        return undefined;
      }
    }
  },
});
