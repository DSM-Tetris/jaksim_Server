import { ObjectType, Field, createUnionType, Int } from "type-graphql";
import { Unauthorized } from "./unauthorized";

enum GetPercentageOfBatteryMessage {
  GetPercentageOFBatterySuccess = "SUCCESS GET PERCENTAGE OF BATTERY",
}

export namespace GetPercentageOfBatteryResponse {
  @ObjectType()
  export class GetPercentageOfBattery {
    constructor(percentageOfBattery: number) {
      this.percentageOfBattery = percentageOfBattery;
      this.message = GetPercentageOfBatteryMessage.GetPercentageOFBatterySuccess;
    }

    @Field(type => Int)
    percentageOfBattery: number;

    @Field()
    message: string;
  }
}

const { GetPercentageOfBattery } = GetPercentageOfBatteryResponse;

export const GetPercentageOfBatteryResult = createUnionType({
  name: "GetPercentageOfBatteryResult",
  types: () => [GetPercentageOfBattery, Unauthorized] as const,
  resolveType: args => {
    switch (args.message) {
      case GetPercentageOfBatteryMessage.GetPercentageOFBatterySuccess: {
        return GetPercentageOfBattery;
      }
      case Unauthorized.getMessage(): {
        return Unauthorized;
      }
      default: {
        return undefined;
      }
    }
  }
});