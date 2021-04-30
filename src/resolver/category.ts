import { Resolver, Query, UseMiddleware, Mutation, Arg } from "type-graphql";
import { Category } from "../entity";
import { auth } from "../middleware";
import { CategoryService } from "../service";
import { GetCategoryListResult, AddCategoryResult } from "../dto";
import { Validate, ValidOf } from "../decorator/validateArguments";
import { categoryNameSchema } from "../schema";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => GetCategoryListResult)
  @UseMiddleware(auth)
  async getCategoryList(): Promise<typeof GetCategoryListResult> {
    return await CategoryService.getCategoryList();
  }

  @Validate
  @Mutation(() => AddCategoryResult)
  @UseMiddleware(auth)
  async addCategory(
    @Arg("categoryName") @ValidOf(categoryNameSchema) categoryName: string
  ): Promise<typeof AddCategoryResult> {
    return await CategoryService.addCategory(categoryName);
  }
}