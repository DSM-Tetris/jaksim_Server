import { Resolver, Query, UseMiddleware, Arg, Mutation } from "type-graphql";
import { Post } from "../entity";
import { GraphQLUpload } from "graphql-upload";
import {
  GetPostsRequest,
  GetPostsResult,
  UploadPostResult,
  UploadPostRequest,
  GetPostResult,
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
  async getPosts(
    @Arg("data") @ValidOf(getPostsSchema) data: GetPostsRequest
  ): Promise<typeof GetPostsResult> {
    return await PostService.getPosts(data);
  }

  @Validate
  @Mutation(() => UploadPostResult)
  @UseMiddleware(auth)
  async uploadPost(
    @Arg("data") @ValidOf(uploadPostSchema) data: UploadPostRequest,
    @Arg("picture", () => GraphQLUpload, { nullable: true })
    @ValidOf(pictureSchema)
    file: Upload | null
  ): Promise<typeof UploadPostResult> {
    return await PostService.uploadPost(data, file);
  }

  @Validate
  @Query(() => GetPostResult)
  @UseMiddleware(auth)
  async getPost(
    @Arg("postId") @ValidOf(getPostSchema) postId: number
  ): Promise<typeof GetPostResult> {
    return await PostService.getPost(postId);
  }
}
