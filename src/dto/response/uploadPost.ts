import { createUnionType, Field, ObjectType } from "type-graphql";
import { BadRequest } from "./badRequest";

enum UploadPostMessage {
  SuccessUploadPost = "SUCCESS UPLOAD POST",
  CategoryNotFound = "CATEGORY NOT FOUND",
}

export namespace UploadPostResponse {
  @ObjectType()
  export class UploadPost {
    constructor() {
      this.message = UploadPostMessage.SuccessUploadPost;
    }

    @Field()
    message!: string;
  }

  @ObjectType()
  export class CategoryNotFound {
    constructor() {
      this.message = UploadPostMessage.CategoryNotFound;
    }

    @Field()
    message!: string;
  }
}

const { UploadPost, CategoryNotFound } = UploadPostResponse;

export const UploadPostResult = createUnionType({
  name: "UploadPostResult",
  types: () => [UploadPost, CategoryNotFound, BadRequest] as const,
  resolveType: (args) => {
    switch (args.message) {
      case UploadPostMessage.SuccessUploadPost: {
        return UploadPost;
      }
      case UploadPostMessage.CategoryNotFound: {
        return CategoryNotFound;
      }
      case BadRequest.getMessage(): {
        return BadRequest;
      }
      default: {
        return undefined;
      }
    }
  },
});
