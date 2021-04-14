import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";

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
}
