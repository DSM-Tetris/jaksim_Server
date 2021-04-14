import { Resolver, Query, UseMiddleware, Arg, Mutation } from "type-graphql";
import { GetPostsRequest, GetPostsResult, UploadPostResult } from "../dto";
import { Post } from "../entity";
import { auth } from "../middleware";
import { PostService } from "../service/post";
import { UploadPostRequest } from "../dto/request/uploadPost";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../type/upload";

@Resolver(Post)
export class PostResolver {
  @Query(() => GetPostsResult)
  @UseMiddleware(auth)
  async getPosts(
    @Arg("data") data: GetPostsRequest
  ): Promise<typeof GetPostsResult> {
    return await PostService.getPosts(data);
  }

  @Mutation(() => UploadPostResult)
  async uploadPost(
    @Arg("data") data: UploadPostRequest,
    @Arg("picture", () => GraphQLUpload) { createReadStream, filename }: Upload
  ) {}
}
