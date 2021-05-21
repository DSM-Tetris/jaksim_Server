import { createUnionType, Field, ObjectType } from "type-graphql";
import { BadRequest } from "./badRequest";

enum RemoveCategoryMessage {
  SuccessRemoveCategory = "SUCCESS REMOVE CATEGORY",
  CategoryNotFound = "CATEGORY NOT FOUND",
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

  @ObjectType()
  export class CategoryNotFound {
    constructor() {
      this.message = RemoveCategoryMessage.CategoryNotFound;
    }

    @Field()
    message: string;
  }
}

const { RemoveCategory, CategoryNotFound } = RemoveCategoryResponse;

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
      case RemoveCategoryMessage.CategoryNotFound: {
        return CategoryNotFound;
      }
      default: {
        return undefined;
      }
    }
  },
});
