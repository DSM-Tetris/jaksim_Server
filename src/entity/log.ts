import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { User } from "./user";
import { LogType } from "./logType";

enum LogType {
  Login = "LOGIN",
  Posting = "POSTING"
}
registerEnumType(LogType, {
  name: "LogType"
});

@ObjectType()
export class Log {
  constructor(date: Date, type: LogType, user: User) {
    this.date = date;
    this.type = type;
    this.user = user;
  }

  @Field((type) => ID)
  readonly id!: number;

  @Field()
  date!: Date;

  @Field((type) => LogType)
  type!: LogType;

  @Field(type => User)
  user!: User;
}
