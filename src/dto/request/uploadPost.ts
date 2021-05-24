import { Field, InputType, Int } from "type-graphql";
import { Length } from "class-validator";
import { Post } from "../../entity";

@InputType()
export class UploadPostRequest {
  @Field()
  @Length(1, 30)
  title!: string;

  @Field(type => String, { nullable: true })
  @Length(1, 300)
  content!: string | null;

  @Field(type => Int, { nullable: true })
  categoryId!: number;

  @Field(() => [String], { nullable: true })
  tagNames!: string[] | null;
  
  toPostEntity(username: string, imageName: string) {
    return new Post(
      this.title,
      this.content,
      imageName,
      username,
      this.categoryId
    );
  }
}
