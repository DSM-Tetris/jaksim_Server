import { Tag } from "../entity";
import { context } from "../context";

export class TagRepository {
  static async findByPostId(postId: number): Promise<Tag[]> {
    return await context.prisma.tag.findMany({
      where: { postId }
    });
  }
}