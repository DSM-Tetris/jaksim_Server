import { ObjectType, Field, createUnionType } from "type-graphql";
import { Length, MaxLength } from "class-validator";
import { Tag } from "../../entity";

enum GetPostsMessage {
  SuccessGetPosts = "SUCCESS GET POSTS",
  NotFoundAnyPost = "NOT FOUND ANY POST",
}

@ObjectType()
export class PostPreview {
  constructor(
    title: string,
    contentPreview: string | null,
    image: string,
    tags: Tag[]
  ) {
    this.title = title;
    this.contentPreview = contentPreview;
    this.image = image;
    this.tags = tags;
  }

  @Field()
  @Length(1, 45)
  title: string;

  @Field(type => String, { nullable: true })
  @MaxLength(100)
  contentPreview: string | null;

  @Field()
  @Length(1, 45)
  image: string;

  @Field(type => [Tag])
  tags: Tag[];
}

@ObjectType()
export class GetPosts {
  constructor(
    posts: PostPreview[]
  ) {
    this.posts = posts;
    this.message = GetPostsMessage.SuccessGetPosts;
  }

  @Field(type => [PostPreview])
  posts: PostPreview[];

  @Field()
  message: string;
}

@ObjectType()
export class NotFoundPost {
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