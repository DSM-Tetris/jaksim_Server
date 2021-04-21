import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class BadRequest {
  constructor() {
    this.message = "BAD REQUEST";
  }

  static getMessage() {
    return "BAD REQUEST";
  }

  @Field()
  message: string;
}
