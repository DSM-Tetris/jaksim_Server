import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./user";
import { Post } from "./post";

@ObjectType()
export class Category {
  @Field(type => ID)
  id!: number;

  @Field()
  name!: string;

  @Field(type => User)
  user?: User;

  @Field()
  username!: string;

  @Field(type => [Post], { nullable: true })
  posts?: Post[] | null;
}
