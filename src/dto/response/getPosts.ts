import { ObjectType, Field, createUnionType } from "type-graphql";

enum GetPostsMessage {
  SuccessGetPosts = "SUCCESS GET POSTS",
}

@ObjectType()
export class GetPosts {
  constructor() {
    this.message = GetPostsMessage.SuccessGetPosts;
  }

  @Field()
  message: string;
}

export const GetPostsResult = createUnionType({
  name: "GetPostsResult",
  types: () => [GetPosts] as const,
  resolveType: args => {
    switch (args.message) {
      case GetPostsMessage.SuccessGetPosts: {
        return GetPosts;
      }
      default: {
        return undefined;
      }
    }
  },
});