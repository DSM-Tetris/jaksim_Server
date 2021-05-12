import { Resolver, Query, UseMiddleware, Int } from "type-graphql";
import { Log } from "../entity";
import { auth } from "../middleware";
import { LogService } from "../service";
import { GetPercentageOfBatteryResult } from "../dto";

@Resolver(Log)
export class LogResolver {
  @Query(() => GetPercentageOfBatteryResult)
  @UseMiddleware(auth)
  async getPercentageOfBattery(): Promise<typeof GetPercentageOfBatteryResult> {
    return await LogService.getPercentageOfBattery();
  }
}