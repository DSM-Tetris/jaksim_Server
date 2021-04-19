import {
  GetPostsRequest,
  GetPostsResult,
  PostPreview,
  GetPosts,
  NotFoundPost,
} from "../dto";
import { getPostsSchema } from "../schema";
import { validateArguments } from "../util";
import { context } from "../context";
import { PostRepository, TagRepository } from "../repository";

export class PostService {
  static async getPosts({ page }: GetPostsRequest): Promise<typeof GetPostsResult> {
    const username = context.decoded["username"];

    const validateArgumentResult = await validateArguments({ username, page }, getPostsSchema);
    if (validateArgumentResult) {
      throw validateArgumentResult;
    }

    const posts = await PostRepository.findManyByUsername(username, page);
    const response: PostPreview[] = [];

    for (const post of posts) {
      const tags = await TagRepository.findByPostId(post.id);
      response.push(new PostPreview(
        post.title,
        post.content ? post.content.slice(0, 100) : null,
        post.image,
        tags
      ));
    }

    return posts.length ? new GetPosts(response) : new NotFoundPost();
  }
}