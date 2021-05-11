import { LogRepository } from "../repository";
import { context } from "../context";
import { LogType } from "../entity";

export class LogService {
  static async getPercentageOfBattery() {
    const username: string = context.decoded["username"];
    const logs = await LogRepository.findManyByUsername(username);

    let percentageOfBattery: number = 0;

    for (const log of logs) {
      if (log.type === LogType.LOGIN) {
        percentageOfBattery++;
      } else if (log.type === LogType.POSTING) {
        percentageOfBattery += 3;
      }
    }

    return percentageOfBattery < 100 ? percentageOfBattery : 100;
  }
}