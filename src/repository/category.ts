import { Category, User } from "../entity";
import { context } from "../context";

export class CategoryRepository {
  static findManyByUsername(username: string): Promise<Category[]> {
    return context.prisma.category.findMany({
      where: { username },
    });
  }

  static findById(id: number): Promise<Category | null> {
    return context.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  static async saveWithUser(
    { name }: Category,
    { username, password, email, nickname }: User
  ) {
    await context.prisma.category.create({
      data: {
        name,
        user: {
          create: {
            username,
            password,
            email,
            nickname,
          }
        }
      }
    });
  }
}
