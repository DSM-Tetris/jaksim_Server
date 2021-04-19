import { createUnionType, Field, ObjectType } from "type-graphql";

enum RefreshMessage {
  SuccessRefresh = "TOKEN SUCCESSFULLY REFRESHED",
  InvalidAccessToken = "INVALID ACCESS TOKEN",
  InvalidRefreshToken = "INVALID REFRESH TOKEN",
}

@ObjectType()
export class Refresh {
  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.message = RefreshMessage.SuccessRefresh;
  }

  @Field()
  accessToken!: string;

  @Field()
  message!: string;
}

@ObjectType()
export class InvalidAccessToken {
  constructor() {
    this.message = RefreshMessage.InvalidAccessToken;
  }

  @Field()
  message!: string;
}

@ObjectType()
export class InvalidRefreshToken {
  constructor() {
    this.message = RefreshMessage.InvalidRefreshToken;
  }

  @Field()
  message!: string;
}

export const RefreshResult = createUnionType({
  name: "RefreshResult",
  types: () => [Refresh, InvalidAccessToken, InvalidRefreshToken] as const,
  resolveType: (args) => {
    switch (args.message) {
      case RefreshMessage.SuccessRefresh: {
        return Refresh;
      }
      case RefreshMessage.InvalidAccessToken: {
        return InvalidAccessToken;
      }
      case RefreshMessage.InvalidRefreshToken: {
        return InvalidRefreshToken;
      }
      default: {
        return undefined;
      }
    }
  },
});
