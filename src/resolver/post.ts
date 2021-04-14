import { Arg, Mutation, Resolver } from "type-graphql";
import { Post } from "../entity";
import { UploadPostResult } from "../dto";
import { UploadPostRequest } from "../dto/request/uploadPost";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../types/upload";

@Resolver(Post)
export class PostResolver {
  @Mutation(() => UploadPostResult)
  async uploadPost(
    @Arg("data") data: UploadPostRequest,
    @Arg("picture", () => GraphQLUpload) { createReadStream, filename }: Upload
  ) {}
}
