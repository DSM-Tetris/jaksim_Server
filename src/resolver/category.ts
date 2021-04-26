import { Resolver, Query, UseMiddleware } from "type-graphql";
import { Category } from "../entity";
import { Validate } from "../decorator/validateArguments";
import { auth } from "../middleware";
import { CategoryService } from "../service";
import { GetCategoryListResult } from "../dto";

@Resolver(Category)
export class CategoryResolver {
  @Validate
  @Query(() => GetCategoryListResult)
  @UseMiddleware(auth)
  async getCategoryList(): Promise<typeof GetCategoryListResult> {
    return await CategoryService.getCategoryList();
  }
}