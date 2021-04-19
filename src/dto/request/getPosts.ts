import { InputType, Field } from "type-graphql";
import { Min } from "class-validator";

@InputType()
export class GetPostsRequest {
  @Field()
  @Min(1)
  page!: number;
}