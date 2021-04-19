import { Resolver, Query, UseMiddleware, Arg, Mutation } from "type-graphql";
import { Post } from "../entity";
import { GraphQLUpload } from "graphql-upload";
import {
  GetPostsRequest,
  GetPostsResult,
  UploadPostResult,
  UploadPostRequest,
} from "../dto";
import { auth } from "../middleware";
import { PostService } from "../service";
import { Upload } from "../type";

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
    @Arg("picture", () => GraphQLUpload) file: Upload
  ): Promise<typeof UploadPostResult> {
    return PostService.uploadPost(data, file);
  }
}
