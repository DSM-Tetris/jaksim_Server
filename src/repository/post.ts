import { Post } from "../entity";
import { context } from "../context";

export class PostRepository {
  static async findManyByUsername(
    username: string,
  ): Promise<Post[]> {
    return await context.prisma.post.findMany({
      where: { username },
      orderBy: {
        createdAt: "desc",
      }
    });
  }
}