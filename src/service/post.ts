import {
  GetPostRequest,
  GetPostResult,
  GetPost,
  Unauthorized,
  NotFoundPost,
} from "../dto";
import { usernameSchema } from "../schema";
import { validateArguments } from "../util";
import { context } from "../context";
import { PostRepository, TagRepository } from "../repository";

export class PostService {
  static async getPost({ postId }: GetPostRequest): Promise<typeof GetPostResult> {
    const username = context.decoded["username"];

    const validateArgumentResult = await validateArguments({ username, postId }, usernameSchema);
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