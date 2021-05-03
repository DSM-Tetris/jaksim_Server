import { PostRepository, CategoryRepository } from "../repository";
import { context } from "../context";
import { GetCategoryListResult, GetCategoryListResponse } from "../dto";

export class CategoryService {
  static async getCategoryList(): Promise<typeof GetCategoryListResult> {
    const categoryList: GetCategoryListResponse.CategoryList[] = [{
      id: null,
      name: "전체 카테고리",
      count: 0,
    }];
    const username: string = context.decoded["username"];
    
    const posts = await PostRepository.groupPostByCategoryId(username);
    if (!posts.length) {
      return new GetCategoryListResponse.GetCategoryList(categoryList);
    }
  
    const categories = await CategoryRepository.findManyByUsername(username);
    let numOfAllPost = Number(posts[0].count);

    for (let i = 1; i < posts.length; i++) {
      const post = posts[i];
      numOfAllPost += Number(post.count);

      for (let j = 0; j < categories.length; j++) {
        if (post.categoryId === categories[j].id) {
          categoryList.push({
            id: post.categoryId,
            name: categories[j].name,
            count: Number(post.count),
          });
          break;
        }
      }
    }

    for (const category of categories) {
      categoryList[category.name] = 0;
    }
    
    categoryList["전체 카테고리"] = numOfAllPost;
    return new GetCategoryListResponse.GetCategoryList(categoryList);
  }
}