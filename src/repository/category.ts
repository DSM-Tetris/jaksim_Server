import { Category } from "../entity";
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

  static async delete(id: number): Promise<void> {
    await context.prisma.category.delete({ where: { id } });
  }
}
