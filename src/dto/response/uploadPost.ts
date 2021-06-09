import { createUnionType, Field, ObjectType } from "type-graphql";
import { BadRequest } from "./badRequest";
import { CategoryNotFound } from "./categoryNotFound";
import { Unauthorized } from "./unauthorized";

enum UploadPostMessage {
  SuccessUploadPost = "SUCCESS UPLOAD POST",
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
}

const { UploadPost } = UploadPostResponse;

export const UploadPostResult = createUnionType({
  name: "UploadPostResult",
  types: () =>
    [UploadPost, BadRequest, CategoryNotFound, Unauthorized] as const,
  resolveType: (args) => {
    switch (args.message) {
      case UploadPostMessage.SuccessUploadPost: {
        return UploadPost;
      }
      case CategoryNotFound.getMessage(): {
        return CategoryNotFound;
      }
      case BadRequest.getMessage(): {
        return BadRequest;
      }
      case Unauthorized.getMessage(): {
        return Unauthorized;
      }
      default: {
        return undefined;
      }
    }
  },
});
