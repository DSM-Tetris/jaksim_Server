import { Field, InputType } from "type-graphql";
import { IsEmail, Length, MaxLength, IsNumberString } from "class-validator";
import { User } from "../../entity";

@InputType()
export class SignupRequest {
  @Field()
  @Length(6, 8)
  username!: string;

  @Field()
  @Length(8, 20)
  password!: string;

  @Field()
  @IsEmail()
  @MaxLength(25)
  email!: string;

  @Field()
  @Length(2, 6)
  nickname!: string;

  @Field()
  @IsNumberString()
  @Length(6, 6)
  authCode!: string;

  toUserEntity() {
    return new User(this.username, this.password, this.nickname, this.email);
  }
}
