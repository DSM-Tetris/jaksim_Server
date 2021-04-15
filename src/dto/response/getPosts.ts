import { ObjectType, Field, createUnionType } from "type-graphql";
import { Length, MaxLength } from "class-validator";

enum GetPostsMessage {
  SuccessGetPosts = "SUCCESS GET POSTS",
  NotFoundAnyPost = "NOT FOUND ANY POST",
}

@ObjectType()
export class PostPreview {
  constructor(
    title: string,
    contentPreview: string,
    image: string,
    tags: string[] | null,
  ) {
    this.title = title;
    this.contentPreview = contentPreview;
    this.image = image;
    this.tags = tags;
  }

  @Field()
  @Length(1, 45)
  title: string;

  @Field()
  @MaxLength(100)
  contentPreview: string;

  @Field()
  @Length(1, 45)
  image: string;

  @Field()
  tags: string[] | null;
}

@ObjectType()
export class GetPosts {
  constructor(
    posts: PostPreview[]
  ) {
    this.posts = posts;
    this.message = GetPostsMessage.SuccessGetPosts;
  }

  @Field()
  posts: PostPreview[];

  @Field()
  message: string;
}

@ObjectType()
class NotFoundPost {
  constructor() {
    this.message = GetPostsMessage.NotFoundAnyPost;
  }

  @Field()
  message: string;
}

export const GetPostsResult = createUnionType({
  name: "GetPostsResult",
  types: () => [GetPosts, NotFoundPost] as const,
  resolveType: args => {
    switch (args.message) {
      case GetPostsMessage.SuccessGetPosts: {
        return GetPosts;
      }
      case GetPostsMessage.NotFoundAnyPost: {
        return NotFoundPost;
      }
      default: {
        return undefined;
      }
    }
  },
});