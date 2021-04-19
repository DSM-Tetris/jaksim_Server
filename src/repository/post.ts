import { Post } from "../entity";
import { context } from "../context";

export class PostRepository {
  static async findOneByPostId(postId: number): Promise<Post | null> {
    return await context.prisma.post.findUnique({
      where: { id: postId }
    });
  }
}