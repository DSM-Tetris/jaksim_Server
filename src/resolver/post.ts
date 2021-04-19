import { Resolver, Query, UseMiddleware, Arg } from "type-graphql";
import { GetPostsRequest, GetPostsResult } from "../dto";
import { Post } from "../entity";
import { auth } from "../middleware";
import { PostService } from "../service/post";

@Resolver(Post)
export class PostResolver {
  @Query(() => GetPostsResult)
  @UseMiddleware(auth)
  async getPosts(@Arg("data") data: GetPostsRequest): Promise<typeof GetPostsResult> {
    return await PostService.getPosts(data);
  }
}