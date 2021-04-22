import { CategoryRepository } from "../repository/category";
import { PostRepository } from "../repository/post";

export class CategoryService {
  static async getCategoryList(username: string) {
    const categoryList: { [key: string]: number } = {};
    const categories = await CategoryRepository.findManyByUsername(username);

    for (const category of categories) {
      categoryList[category.name] = 0;
    }

    const posts = await PostRepository.findManyByUsername(username);
    
    categoryList["전체 카테고리"] = posts.length;
    for (const post of posts) {
      if (post.category) {
        const categoryName = post.category.name;
        categoryList[categoryName] += 1;
      }
    }

    return categoryList;
  }
}