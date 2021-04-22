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
      },
    });
  }

  static async findOneByPostId(postId: number): Promise<Post | null> {
    return await context.prisma.post.findUnique({
      where: { id: postId }
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