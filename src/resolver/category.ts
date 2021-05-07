import { Resolver, Query, UseMiddleware, Mutation, Arg } from "type-graphql";
import { Category } from "../entity";
import { auth } from "../middleware";
import { CategoryService } from "../service";
import {
  GetCategoryListResult,
  AddCategoryResult,
  ModifyCategoryResult,
  ModifyCategoryRequest,
  RemoveCategoryResult,
} from "../dto";
import { Validate, ValidOf } from "../decorator/validateArguments";
import {
  categoryIdSchema,
  categoryNameSchema,
  modifyCategorySchema,
} from "../schema";

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

  @Validate
  @Mutation(() => ModifyCategoryResult)
  @UseMiddleware(auth)
  async modifyCategory(
    @Arg("data") @ValidOf(modifyCategorySchema) data: ModifyCategoryRequest
  ): Promise<typeof ModifyCategoryResult> {
    return await CategoryService.modifyCategory(data);
  }

  @Validate
  @Mutation(() => RemoveCategoryResult)
  @UseMiddleware(auth)
  async removeCategory(@Arg("id") @ValidOf(categoryIdSchema) id: number) {
    return await CategoryService.removeCategory(id);
  }
}
