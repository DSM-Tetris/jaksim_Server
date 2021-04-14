import { InputType, Field } from "type-graphql";
import { Length, Min } from "class-validator";

@InputType()
export class GetPostsRequest {
  @Field()
  @Length(6, 8)
  username!: string;

  @Field()
  @Min(1)
  page!: number;
}