import { Log } from "../entity";
import { context } from "../context";

export class LogRepository {
  static async save({ date, type, id, user }: Log) {
    await context.prisma.log.create({
      data: {
        id,
        date,
        type,
        username: user.username,
      },
    });
  }
}
