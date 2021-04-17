import {
  GetPostsRequest,
  GetPostsResult,
  GetPostRequest,
  GetPostResult,
  PostPreview,
  GetPosts,
  GetPost,
  Unauthorized,
  NotFoundAnyPost,
  NotFoundPost,
} from "../dto";
import { usernameSchema } from "../schema";
import { validateArguments } from "../util";
import { context } from "../context";
import { PostRepository, TagRepository } from "../repository";

export class PostService {
  static async getPosts({ username, page }: GetPostsRequest): Promise<typeof GetPostsResult> {
    const validateArgumentResult = await validateArguments(username, usernameSchema);
    if (validateArgumentResult) {
      throw validateArgumentResult;
    }

    if (context.decoded["username"] !== username) {
      return new Unauthorized();
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

    return posts.length ? new GetPosts(response) : new NotFoundAnyPost();
  }

  static async getPost({ username, postId }: GetPostRequest): Promise<typeof GetPostResult> {
    const validateArgumentResult = await validateArguments(username, usernameSchema);
    if (validateArgumentResult) {
      throw validateArgumentResult;
    }

    if (context.decoded["username"] !== username) {
      return new Unauthorized();
    }

    const post = await PostRepository.findOneByPostId(postId);
    if (!post) {
      return new NotFoundPost();
    }
    if (post.username !== username) {
      return new Unauthorized();
    }

    const tags = await TagRepository.findByPostId(postId);
    post.tags = tags;

    return new GetPost(post);
  }
}