import { InputType, Field } from "type-graphql";
import { Min } from "class-validator";

@InputType()
export class GetPostRequest {
  @Field()
  @Min(1)
  postId!: number;
}