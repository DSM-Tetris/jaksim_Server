import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { User } from "./user";

export enum LogType {
  LOGIN = "LOGIN",
  POSTING = "POSTING",
}

registerEnumType(LogType, {
  name: "LogType",
});

@ObjectType()
export class Log {
  constructor(date: Date, type: LogType, username: string) {
    this.date = date;
    this.type = type;
    this.username = username;
  }

  @Field((type) => ID)
  readonly id!: number;

  @Field()
  date!: Date;

  @Field((type) => LogType)
  type!: LogType;

  @Field((type) => User)
  user?: User | null;

  @Field()
  username!: string;
}
