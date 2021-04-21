import { createUnionType, Field, ObjectType } from "type-graphql";

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
  types: () => [UploadPost] as const,
  resolveType: (args) => {
    switch (args.message) {
      case UploadPostMessage.SuccessUploadPost: {
        return UploadPost;
      }
      default: {
        return undefined;
      }
    }
  },
});
