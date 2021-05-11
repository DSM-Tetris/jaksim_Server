import moment from "moment";
import { Log } from "../entity";
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
        username
      },
      distinct: ["date", "type"],
    });
  }
}