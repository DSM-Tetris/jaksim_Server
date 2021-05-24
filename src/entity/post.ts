import { Field, ID, ObjectType, Int } from "type-graphql";
import { User } from "./user";
import { Category } from "./category";
import { Tag } from "./tag";

@ObjectType()
export class Post {
  constructor(
    title: string,
    content: string,
    image: string,
    username: string,
    categoryId: number | null,
  ) {
    this.title = title;
    this.content = content;
    this.image = image;
    this.createdAt = new Date();
    this.username = username;
    this.categoryId = categoryId;
  }

  @Field((type) => ID)
  readonly id!: number;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field()
  image!: string;

  @Field()
  createdAt!: Date;

  @Field((type) => User)
  user?: User;

  @Field()
  username!: string;

  @Field((type) => Category, { nullable: true })
  category?: Category | null;

  @Field((type) => Int, { nullable: true })
  categoryId!: number | null;

  @Field((type) => [Tag], { nullable: true })
  tags?: Tag[] | null;
}
