import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class CategoryNotFound {
  constructor() {
    this.message = "CATEGORY NOT FOUND";
  }

  @Field()
  message: string;

  static getMessage(): string {
    return "CATEGORY NOT FOUND";
  }
}