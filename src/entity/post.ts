import { Field, ID, ObjectType, Int } from "type-graphql";
import { User } from "./user";
import { Category } from "./category";
import { Tag } from "./tag";

@ObjectType()
export class Post {
  @Field(type => ID)
  readonly id!: number;

  @Field()
  title!: string;

  @Field(type => String, { nullable: true })
  content!: string | null;

  @Field()
  image!: string;

  @Field()
  createdAt!: Date;

  @Field(type => User)
  user?: User;

  @Field()
  username!: string;

  @Field(type => Category, { nullable: true })
  category?: Category | null;

  @Field(type => Int, { nullable: true })
  categoryId!: number | null;

  @Field(type => [Tag], { nullable: true })
  tags?: [Tag] | null;
}
