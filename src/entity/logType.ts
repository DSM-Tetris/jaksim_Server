import { registerEnumType } from "type-graphql";

export enum LogType {
  LOGIN = "LOGIN",
  POSTING = "POSTING",
}

registerEnumType(LogType, {
  name: "LogType",
});
