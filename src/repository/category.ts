import { Category } from "../entity";
import { context } from "../context";

export class CategoryRepository {
  static async getCategoryListByUsername(username: string): Promise<Category[]> {
    return context.prisma.category.findMany({
      where: { username }
    });
  }
}