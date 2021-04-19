import { ObjectType, Field, createUnionType } from "type-graphql";
import { Post } from "../../entity";
import { Unauthorized } from "./unauthorized";

enum GetPostMessage {
  SuccessGetPost = "SUCCESS GET POST",
  ForbiddenPost = "FORBIDDEN",
  NotFoundPost = "NOT FOUND POST",
}

export namespace GetPostResponse {
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
  export class ForbiddenPost {
    constructor() {
      this.message = GetPostMessage.ForbiddenPost
    }

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
}

const { GetPost, ForbiddenPost, NotFoundPost } = GetPostResponse;

export const GetPostResult = createUnionType({
  name: "GetPostResult",
  types: () => [GetPost, Unauthorized, ForbiddenPost, NotFoundPost] as const,
  resolveType: args => {
    switch (args.message) {
      case GetPostMessage.SuccessGetPost: {
        return GetPost;
      }
      case Unauthorized.getMessage(): {
        return Unauthorized;
      }
      case GetPostMessage.ForbiddenPost: {
        return ForbiddenPost;
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