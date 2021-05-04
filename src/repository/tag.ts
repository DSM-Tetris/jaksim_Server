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
    const today = moment().format("YYYY-MM-DD");
    
    return context.prisma.tag.groupBy({
      by: ["tagName"],
      count: true,
      where: {
        createdAt: {
          gt: moment(today).add(ago, "days").toISOString(),
          lt: moment(today).add(1, "days").toISOString(),
        },
      },
    });
  }
}