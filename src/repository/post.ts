import { Post } from "../entity";
import { context } from "../context";

export class PostRepository {
  static async findManyByUsername(
    username: string,
    page: number,
    categoryId?: number
  ): Promise<Post[]> {
    return await context.prisma.post.findMany({
      where: {
        username,
        categoryId,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * 10,
      take: 10,
    });
  }

  static async findOneByPostId(postId: number): Promise<Post | null> {
    return await context.prisma.post.findUnique({
      where: { id: postId },
    });
  }

  static async saveWithTags(
    { username, title, content, categoryId, image }: Post,
    tagNames: string[] = []
  ): Promise<void> {
    const now = new Date();
    await context.prisma.post.create({
      data: {
        username: username,
        title,
        content,
        categoryId: categoryId!,
        image,
        createdAt: now,
        tags: {
          create: tagNames.map((tagName) => ({
            tagName,
            createdAt: now,
          })),
        },
      },
    });
  }
}
