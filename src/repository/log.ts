import { Log } from "../entity";
import { context } from "../context";

export class LogRepository {
  static async save({ date, type, user }: Log) {
    await context.prisma.log.create({
      data: {
        date,
        type,
        username: user.username,
      },
    });
  }
}
