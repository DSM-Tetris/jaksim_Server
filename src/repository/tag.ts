import moment from "moment";
import { Tag } from "../entity";
import { context } from "../context";

export class TagRepository {
  static async findByPostId(postId: number): Promise<Tag[]> {
    return await context.prisma.tag.findMany({
      where: { postId }
    });
  }

  static countTags(ago: number) {
    const gteDay = moment().subtract(ago, "d").format("YYYY-MM-DD");
    const ltDay = moment().add(1, "d").format("YYYY-MM-DD");

    return context.prisma.tag.groupBy({
      by: ["tagName"],
      count: true,
      where: {
        createdAt: {
          gte: new Date(gteDay).toISOString(),
          lt: new Date(ltDay).toISOString(),
        },
      },
    });
  }
}