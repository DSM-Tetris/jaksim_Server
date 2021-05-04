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
import {
  getPostsSchema,
  getPostSchema,
  uploadPostSchema,
  pictureSchema,
} from "../schema";

@Resolver(Post)
export class PostResolver {
  @Validate
  @Query(() => GetPostsResult)
  @UseMiddleware(auth)
  getPosts(
    @Arg("data") @ValidOf(getPostsSchema) data: GetPostsRequest
  ): Promise<typeof GetPostsResult> {
    return PostService.getPosts(data);
  }

  @Validate
  @Mutation(() => UploadPostResult)
  uploadPost(
    @Arg("data") @ValidOf(uploadPostSchema) data: UploadPostRequest,
    @Arg("picture", () => GraphQLUpload) @ValidOf(pictureSchema) file: Upload
  ): Promise<typeof UploadPostResult> {
    return PostService.uploadPost(data, file);
  }

  @Validate
  @Query(() => GetPostResult)
  @UseMiddleware(auth)
  getPost(
    @Arg("data") @ValidOf(getPostSchema) data: GetPostRequest
  ): Promise<typeof GetPostResult> {
    return PostService.getPost(data);
  }
}
