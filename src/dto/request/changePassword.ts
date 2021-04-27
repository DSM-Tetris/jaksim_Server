import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class ChangePasswordRequest {
  @Field()
  @Length(8, 20)
  oldPassword!: string;

  @Field()
  @Length(8, 20)
  newPassword!: string;
}