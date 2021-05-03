import { InputType, Field, Int } from "type-graphql";
import { Min, Length } from "class-validator";

@InputType()
export class ModifyCategoryRequest {
  @Field(type => Int)
  @Min(1)
  id!: number;

  @Field()
  @Length(1, 20)
  name!: string;
}