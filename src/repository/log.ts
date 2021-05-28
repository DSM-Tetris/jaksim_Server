import moment from "moment";
import { Log, LogType } from "../entity";
import { context } from "../context";

export class LogRepository {
  static async save({ date, type, username }: Log) {
    await context.prisma.log.create({
      data: {
        date,
        type,
        username,
      },
    });
  }

  static findManyByUsername(username: string) {
    const thisMonth = moment().format("YYYY-MM");
    const nextMonth = moment().add(1, "M").format("YYYY-MM");

    return context.prisma.log.findMany({
      where: {
        date: {
          gte: new Date(thisMonth).toISOString(),
          lt: new Date(nextMonth).toISOString(),
        },
        username,
      },
      distinct: ["date", "type"],
    });
  }

  static findByUsername(username: string) {
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    const lastTime = new Date();
    lastTime.setHours(23, 59, 59);
    return context.prisma.log.findFirst({
      where: {
        AND: {
          date: {
            gte: midnight,
            lte: lastTime,
          },
          username,
          type: LogType.POSTING,
        },
      },
    });
  }
}
