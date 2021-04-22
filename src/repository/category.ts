import { Category } from "../entity";
import { context } from "../context";

export class CategoryRepository {
  static async findManyByUsername(username: string): Promise<Category[]> {
    return context.prisma.category.findMany({
      where: { username }
    });
  }
}