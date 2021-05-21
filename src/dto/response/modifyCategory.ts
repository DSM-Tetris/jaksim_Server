import { ObjectType, Field, createUnionType } from "type-graphql";
import { BadRequest } from "./badRequest";
import { Unauthorized } from "./unauthorized";
import { CategoryNotFound } from "./categoryNotFound";

enum ModifyCategoryMessage {
  ModifyCategorySuccess = "MODIFY CATEGORY SUCCESS",
  Forbidden = "FORBIDDEN",
}

export namespace ModifyCategoryResponse {
  @ObjectType()
  export class ModifyCategory {
    constructor() {
      this.message = ModifyCategoryMessage.ModifyCategorySuccess;
    }

    @Field()
    message: string;
  }

  @ObjectType()
  export class Forbidden {
    constructor() {
      this.message = ModifyCategoryMessage.Forbidden;
    }

    @Field()
    message: string;
  }
}

const { ModifyCategory, Forbidden } = ModifyCategoryResponse;

export const ModifyCategoryResult = createUnionType({
  name: "ModifyCategoryResult",
  types: () => [ModifyCategory, CategoryNotFound, Forbidden, BadRequest, Unauthorized] as const,
  resolveType: args => {
    switch (args.message) {
      case ModifyCategoryMessage.ModifyCategorySuccess: {
        return ModifyCategory;
      }
      case CategoryNotFound.getMessage(): {
        return CategoryNotFound;
      }
      case ModifyCategoryMessage.Forbidden: {
        return Forbidden;
      }
      case BadRequest.getMessage(): {
        return BadRequest;
      }
      case Unauthorized.getMessage(): {
        return Unauthorized;
      }
      default: {
        return undefined;
      }
    }
  },
});