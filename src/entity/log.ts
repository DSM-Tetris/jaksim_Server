import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { User } from "./user";

enum LogType {
  Login = "LOGIN",
  Posting = "POSTING"
}
registerEnumType(LogType, {
  name: "LogType"
});

@ObjectType()
export class Log {
  @Field(type => ID)
  readonly id!: number;

  @Field()
  date!: Date;

  @Field(type => LogType)
  type!: LogType;

  @Field(type => User)
  user!: User;
}
