import { ObjectType, Field, createUnionType } from "type-graphql";
import { Post } from "../../entity";
import { Unauthorized } from "./unauthorized";

enum GetPostMessage {
  SuccessGetPost = "SUCCESS GET POST",
  NotFoundPost = "NOT FOUND POST",
}

@ObjectType()
export class GetPost {
  constructor(
    post: Post | null,
  ) {
    this.post = post;
    this.message = GetPostMessage.SuccessGetPost;
  }

  @Field(type => Post, { nullable: true })
  post: Post | null;

  @Field()
  message: string;
}

@ObjectType()
export class NotFoundPost {
  constructor() {
    this.message = GetPostMessage.NotFoundPost;
  }

  @Field()
  message: string;
}

export const GetPostResult = createUnionType({
  name: "GetPostResult",
  types: () => [GetPost, Unauthorized, NotFoundPost] as const,
  resolveType: args => {
    switch (args.message) {
      case GetPostMessage.SuccessGetPost: {
        return GetPost;
      }
      case Unauthorized.getMessage(): {
        return Unauthorized;
      }
      case GetPostMessage.NotFoundPost: {
        return NotFoundPost;
      }
      default: {
        return undefined;
      }
    }
  }
});