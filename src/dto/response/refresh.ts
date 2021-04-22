import { createUnionType, Field, ObjectType } from "type-graphql";
import { BadRequest } from "./badRequest";

enum RefreshMessage {
  SuccessRefresh = "TOKEN SUCCESSFULLY REFRESHED",
  InvalidAccessToken = "INVALID ACCESS TOKEN",
  InvalidRefreshToken = "INVALID REFRESH TOKEN",
}

export namespace RefreshResponse {
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
}

const { Refresh, InvalidAccessToken, InvalidRefreshToken } = RefreshResponse;

export const RefreshResult = createUnionType({
  name: "RefreshResult",
  types: () =>
    [Refresh, InvalidAccessToken, InvalidRefreshToken, BadRequest] as const,
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
      case BadRequest.getMessage(): {
        return BadRequest;
      }
      default: {
        return undefined;
      }
    }
  },
});
