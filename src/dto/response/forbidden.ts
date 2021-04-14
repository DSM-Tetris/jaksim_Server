import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Forbidden {
  constructor() {
    this.message = "FORBIDDEN";
  }

  @Field()
  message: string;
}