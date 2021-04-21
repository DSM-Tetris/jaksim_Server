import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";
import { Post } from "../../entity";

@InputType()
export class UploadPostRequest {
  @Field()
  @Length(1, 30)
  title!: string;

  @Field()
  @Length(1, 300)
  content!: string;

  @Field()
  categoryId!: number;

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
