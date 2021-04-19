import { Post } from "../entity";
import { context } from "../context";

export class PostRepository {
  static async findManyByUsername(
    username: string,
    page: number
  ): Promise<Post[]> {
    return await context.prisma.post.findMany({
      where: { username },
      skip: (page - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async save({
    username,
    title,
    content,
    categoryId,
    image,
  }: Post): Promise<void> {
    await context.prisma.post.create({
      data: {
        username: username,
        title,
        content,
        categoryId: categoryId!,
        image,
        createdAt: new Date(),
      },
    });
  }
}
