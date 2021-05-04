import { Resolver, Query, UseMiddleware } from "type-graphql";
import { Category } from "../entity";
import { auth } from "../middleware";
import { CategoryService } from "../service";
import { GetCategoryListResult } from "../dto";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => GetCategoryListResult)
  @UseMiddleware(auth)
  getCategoryList(): Promise<typeof GetCategoryListResult> {
    return CategoryService.getCategoryList();
  }
}
