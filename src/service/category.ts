import {
  PostRepository,
  CategoryRepository,
  UserRepository,
} from "../repository";
import { context } from "../context";
import {
  GetCategoryListResult,
  GetCategoryListResponse,
  AddCategoryResult,
  AddCategoryResponse,
  ModifyCategoryResult,
  ModifyCategoryResponse,
  ModifyCategoryRequest,
  RemoveCategoryResult,
  RemoveCategoryResponse,
} from "../dto";
import { Category } from "../entity";

export class CategoryService {
  static async getCategoryList(): Promise<typeof GetCategoryListResult> {
    const username: string = context.decoded["username"];
    const posts = await PostRepository.groupPostByCategoryId(username);
    if (!posts.length) {
      return new GetCategoryListResponse.GetCategoryList([]);
    }

    const categories = await CategoryRepository.findManyByUsername(username);

    return new GetCategoryListResponse.GetCategoryList(
      this.getRawCategoryList(posts, categories)
    );
  }

  static async removeCategory(
    id: number
  ): Promise<typeof RemoveCategoryResult> {
    const username: string = context.decoded["username"];
    const category = await CategoryRepository.findByIdAndUsername(id, username);
    if (!category) {
      return new RemoveCategoryResponse.CategoryNotFound();
    }
    await CategoryRepository.delete(id);
    return new RemoveCategoryResponse.RemoveCategory();
  }

  private static getRawCategoryList(posts, categories: Category[]) {
    const result: GetCategoryListResponse.CategoryList[] = [];
    for (const post of posts) {
      if (post.categoryId !== null) {
        const index = this.findIndexWithSameCategoryId(post, categories);
        result.push({
          id: post.categoryId,
          name: categories[index].name,
          count: post.count,
        });
        categories.splice(index, 1);
      }
    }
    result.push(this.getWholeCategory(posts));
    return result;
  }

  private static findIndexWithSameCategoryId(post, categories: Category[]) {
    let left = 0;
    let right = categories.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (categories[mid].id === post.categoryId) {
        return mid;
      } else if (categories[mid].id > post.categoryId) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return -1;
  }

  static async addCategory(
    categoryName: string
  ): Promise<typeof AddCategoryResult> {
    const username = context.decoded["username"];

    const user = await UserRepository.findByUsername(username);
    const hasCategory = await CategoryRepository.findByNameAndUsername(
      categoryName,
      username
    );

    if (hasCategory) {
      return new AddCategoryResponse.CategoryAlreadyExists();
    }

    await CategoryRepository.saveWithUser(username, user!);
    return new AddCategoryResponse.AddCategory();
  }

  static async modifyCategory(
    data: ModifyCategoryRequest
  ): Promise<typeof ModifyCategoryResult> {
    const { id, categoryName } = data;
    const username = context.decoded["username"];

    const category = await CategoryRepository.findById(id);
    if (!category) {
      return new ModifyCategoryResponse.CategoryNotFound();
    }
    if (username !== category.username) {
      return new ModifyCategoryResponse.Forbidden();
    }

    await CategoryRepository.modifyById(id, categoryName);
    return new ModifyCategoryResponse.ModifyCategory();
  }

  private static getWholeCategory(posts): GetCategoryListResponse.CategoryList {
    return {
      id: null,
      name: "전체 카테고리",
      count: this.getNumOfAllPosts(posts),
    };
  }

  private static getNumOfAllPosts(posts) {
    return posts.reduce((prev, post) => prev + post.count, 0);
  }
}
