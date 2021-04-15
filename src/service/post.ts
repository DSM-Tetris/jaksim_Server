import { GetPostsRequest, Unauthorized } from "../dto";
import { usernameSchema } from "../schema";
import { validateArguments } from "../util";
import { context } from "../context";
import { PostRepository } from "../repository";

export class PostService {
  static async getPosts({ username, page }: GetPostsRequest) {
    const validateArgumentResult = await validateArguments(username, usernameSchema);
    if (validateArgumentResult) {
      throw validateArgumentResult;
    }

    if (context.decoded["username"] !== username) {
      return new Unauthorized();
    }

    // 3. get user's posts
    const post = await PostRepository.findManyByUsername(username, page);
  }
}