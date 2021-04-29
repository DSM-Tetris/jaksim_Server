import { Resolver, Query, UseMiddleware, Mutation, Arg } from "type-graphql";
import { Category } from "../entity";
import { auth } from "../middleware";
import { CategoryService } from "../service";
import { GetCategoryListResult, AddCategoryResult } from "../dto";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => GetCategoryListResult)
  @UseMiddleware(auth)
  async getCategoryList(): Promise<typeof GetCategoryListResult> {
    return await CategoryService.getCategoryList();
  }

  @Mutation(() => AddCategoryResult)
  @UseMiddleware(auth)
  async addCategory(
    @Arg("categoryName") categoryName: string
  ): Promise<typeof AddCategoryResult> {
    return await CategoryService.addCategory(categoryName);
  }
}