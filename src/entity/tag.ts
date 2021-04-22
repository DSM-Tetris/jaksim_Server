import { Field, ObjectType, Int } from "type-graphql";
import { Post } from "./post";

@ObjectType()
export class Tag {
  @Field(type => Post)
  post?: Post;

  @Field(type => Int)
  postId!: number;

  @Field()
  tagName!: string;

  @Field()
  createdAt!: Date;
}
