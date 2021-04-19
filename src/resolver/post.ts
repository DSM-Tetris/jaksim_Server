import { Resolver, Query, UseMiddleware, Arg } from "type-graphql";
import { GetPostRequest, GetPostResult } from "../dto";
import { Post } from "../entity";
import { auth } from "../middleware";
import { PostService } from "../service/post";

@Resolver(Post)
export class PostResolver {
  @Query(() => GetPostResult)
  @UseMiddleware(auth)
  async getPost(@Arg("data") data: GetPostRequest): Promise<typeof GetPostResult> {
    return await PostService.getPost(data);
  }
}