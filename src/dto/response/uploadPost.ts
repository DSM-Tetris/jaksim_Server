import { createUnionType, Field, ObjectType } from "type-graphql";
import { BadRequest } from "./badRequest";

enum UploadPostMessage {
  SuccessUploadPost = "SUCCESS UPLOAD POST",
}

@ObjectType()
export class UploadPost {
  constructor() {
    this.message = UploadPostMessage.SuccessUploadPost;
  }

  @Field()
  message!: string;
}

export const UploadPostResult = createUnionType({
  name: "UploadPostResult",
  types: () => [UploadPost, BadRequest] as const,
  resolveType: (args) => {
    switch (args.message) {
      case UploadPostMessage.SuccessUploadPost: {
        return UploadPost;
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
