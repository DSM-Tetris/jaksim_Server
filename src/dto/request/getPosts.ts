import { InputType, Field, Int } from "type-graphql";
import { Min } from "class-validator";

@InputType()
export class GetPostsRequest {
  @Field()
  @Min(1)
  page!: number;

  @Field(type => Int, { nullable: true })
  @Min(1)
  categoryId?: number | null;
}