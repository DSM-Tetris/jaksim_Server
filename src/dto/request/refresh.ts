import { Field, InputType } from "type-graphql";

@InputType()
export class RefreshRequest {
  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;
}
