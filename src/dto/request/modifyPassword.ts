import { InputType, Field } from "type-graphql";
import { IsEmail, MaxLength, Length } from "class-validator";

@InputType()
export class ModifyPasswordRequest {
  @Field()
  @IsEmail()
  @MaxLength(25)
  email!: string;

  @Field()
  @Length(8, 20)
  newPassword!: string;
}