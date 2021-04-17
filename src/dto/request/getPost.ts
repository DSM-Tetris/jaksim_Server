import { InputType, Field } from "type-graphql";
import { Length, Min } from "class-validator";

@InputType()
export class GetPostRequest {
  @Field()
  @Length(6, 8)
  username!: string;

  @Field()
  @Min(1)
  postId!: number;
}