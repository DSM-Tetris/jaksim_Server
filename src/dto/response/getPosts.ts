import { ObjectType, Field, createUnionType } from "type-graphql";
import { Length, MaxLength } from "class-validator";

enum GetPostsMessage {
  SuccessGetPosts = "SUCCESS GET POSTS",
}

@ObjectType()
export class GetPosts {
  constructor(
    title: string,
    contentPreview: string,
    image: string,
    tags: string[] | null
  ) {
    this.title = title;
    this.contentPreview = contentPreview;
    this.image = image;
    this.tags = tags;
    this.message = GetPostsMessage.SuccessGetPosts;
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