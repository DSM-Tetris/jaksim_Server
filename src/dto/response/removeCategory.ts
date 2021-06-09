import { createUnionType, Field, ObjectType } from "type-graphql";
import { BadRequest } from "./badRequest";
import { CategoryNotFound } from "./categoryNotFound";
import { Unauthorized } from "./unauthorized";

enum RemoveCategoryMessage {
  SuccessRemoveCategory = "SUCCESS REMOVE CATEGORY",
}

export namespace RemoveCategoryResponse {
  @ObjectType()
  export class RemoveCategory {
    constructor() {
      this.message = RemoveCategoryMessage.SuccessRemoveCategory;
    }

    @Field()
    message: string;
  }
}

const { RemoveCategory } = RemoveCategoryResponse;

export const RemoveCategoryResult = createUnionType({
  name: "RemoveCategoryResult",
  types: () => [BadRequest, RemoveCategory, CategoryNotFound],
  resolveType: (args) => {
    switch (args.message) {
      case BadRequest.getMessage(): {
        return BadRequest;
      }
      case RemoveCategoryMessage.SuccessRemoveCategory: {
        return RemoveCategory;
      }
      case CategoryNotFound.getMessage(): {
        return CategoryNotFound;
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
