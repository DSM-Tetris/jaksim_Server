import {
  GetPostsRequest,
  GetPostsResult,
  GetPostRequest,
  GetPostResult,
  GetPostsResponse,
  GetPostResponse,
} from "../dto";
import { getPostsSchema, getPostSchema } from "../schema";
import { validateArguments } from "../util";
import { context } from "../context";
import { PostRepository, TagRepository } from "../repository";

export class PostService {
  static async getPosts({ page, categoryId }: GetPostsRequest): Promise<typeof GetPostsResult> {
    const username = context.decoded["username"];

    await validateArguments({ username, page, categoryId }, getPostsSchema);

    const posts = await PostRepository.findManyByUsername(username, page, categoryId);
    const response: GetPostsResponse.PostPreview[] = [];

    for (const post of posts) {
      const tags = await TagRepository.findByPostId(post.id);
      response.push(new GetPostsResponse.PostPreview(
        post.title,
        post.content ? post.content.slice(0, 100) : null,
        post.image,
        tags
      ));
    }

    return posts.length ? new GetPostsResponse.GetPosts(response) : new GetPostsResponse.NotFoundAnyPost();
  }

  static async getPost({ postId }: GetPostRequest): Promise<typeof GetPostResult> {
    const username = context.decoded["username"];

    await validateArguments({ postId }, getPostSchema);

    const post = await PostRepository.findOneByPostId(postId);
    if (!post) {
      return new GetPostResponse.NotFoundPost();
    }
    if (post.username !== username) {
      return new GetPostResponse.ForbiddenPost();
    }

    const tags = await TagRepository.findByPostId(postId);
    post.tags = tags;

    return new GetPostResponse.GetPost(post);
  }
}