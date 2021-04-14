import { Post } from "../entity";
import { context } from "../context";

export class PostRepository {
  static async findManyByUsername(
    username: string,
    page: number
  ): Promise<Post[] | null> {
    return await context.prisma.post.findMany({
      where: { username },
      skip: page * 2,
      take: 2
    });
  }
}