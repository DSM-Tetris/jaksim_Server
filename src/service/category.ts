import { PostRepository, CategoryRepository } from "../repository";
import { context } from "../context";
import { GetCategoryListResult, GetCategoryListResponse } from "../dto";
import { Category } from "../entity";

export class CategoryService {
  static async getCategoryList(): Promise<typeof GetCategoryListResult> {
    const username: string = context.decoded["username"];

    const posts = await PostRepository.groupPostByCategoryId(username);
    const categories = await CategoryRepository.findManyByUsername(username);

    return new GetCategoryListResponse.GetCategoryList(
      this.getRawCategoryList(posts, categories)
    );
  }

  private static getRawCategoryList(posts, categories: Category[]) {
    const result = {};
    for (const post of posts) {
      if (post.categoryId !== null) {
        const index = this.findIndexWithSameCategoryId(post, categories);
        result[categories[index].name] = post.count;
        categories.splice(index, 1);
      }
    }
    result["전체 카테고리"] = this.getNumOfAllPosts(posts);
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

  private static getNumOfAllPosts(posts) {
    return posts.reduce((prev, post) => prev + post.count, 0);
  }
}
