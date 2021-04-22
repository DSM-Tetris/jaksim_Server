import { Category } from "../entity";
import { context } from "../context";

export class CategoryRepository {
  static getCategoryList(username: string): Promise<Category[]> {
    return context.prisma.category.findMany({
      where: { username },
    });
  }
}
