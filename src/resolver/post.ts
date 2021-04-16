import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entity";
import { UploadPostResult, UploadPostRequest } from "../dto";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../types";

@Resolver(Post)
export class PostResolver {
  @Query(() => Post)
  async getPost() {}

  @Mutation(() => UploadPostResult)
  async uploadPost(
    @Arg("data") data: UploadPostRequest,
    @Arg("picture", () => GraphQLUpload) { createReadStream, filename }: Upload
  ) {}
}
