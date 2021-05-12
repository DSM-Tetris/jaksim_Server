import { Resolver, Query, UseMiddleware, Int } from "type-graphql";
import { Log } from "../entity";
import { auth } from "../middleware";
import { LogService } from "../service";

@Resolver(Log)
export class LogResolver {
  @Query(() => Int)
  @UseMiddleware(auth)
  async getPercentageOfBattery(): Promise<number> {
    return await LogService.getPercentageOfBattery();
  }
}