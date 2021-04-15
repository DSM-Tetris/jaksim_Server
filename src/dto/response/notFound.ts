import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class NotFound {
  constructor() {
    this.message = "NOT FOUND";
  }

  @Field()
  message: string;
}