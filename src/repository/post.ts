import { Post } from "../entity";
import { context } from "../context";

export class PostRepository {
  static async findManyByUsername(
    username: string,
    page: number,
    categoryId?: number,
  ): Promise<Post[]> {
    return await context.prisma.post.findMany({
      where: {
        username,
        categoryId
      },
      skip: (page - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: "desc",
      }
    });
  }
}