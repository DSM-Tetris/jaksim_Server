import { Resolver, Query, UseMiddleware, Arg, Mutation } from "type-graphql";
import { Post } from "../entity";
import { GraphQLUpload } from "graphql-upload";
import {
  GetPostsRequest,
  GetPostsResult,
  UploadPostResult,
  UploadPostRequest,
  GetPostResult,
  GetPostRequest,
} from "../dto";
import { auth } from "../middleware";
import { PostService } from "../service";
import { Upload } from "../type";
import { Validate, ValidOf } from "../decorator/validateArguments";
import { getPostsSchema, getPostSchema, uploadPostSchema } from "../schema";

@Resolver(Post)
export class PostResolver {
  @Validate
  @Query(() => GetPostsResult)
  @UseMiddleware(auth)
  async getPosts(
    @Arg("data") @ValidOf(getPostsSchema) data: GetPostsRequest
  ): Promise<typeof GetPostsResult> {
    return await PostService.getPosts(data);
  }

  @Validate
  @Mutation(() => UploadPostResult)
  async uploadPost(
    @Arg("data") @ValidOf(uploadPostSchema) data: UploadPostRequest,
    @Arg("picture", () => GraphQLUpload) file: Upload
  ): Promise<typeof UploadPostResult> {
    return await PostService.uploadPost(data, file);
  }

  @Validate
  @Query(() => GetPostResult)
  @UseMiddleware(auth)
  async getPost(
    @Arg("data") @ValidOf(getPostSchema) data: GetPostRequest
  ): Promise<typeof GetPostResult> {
    return await PostService.getPost(data);
  }
}
