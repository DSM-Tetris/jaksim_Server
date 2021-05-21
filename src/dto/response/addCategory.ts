import { ObjectType, Field, createUnionType } from "type-graphql";
import { BadRequest } from "./badRequest";
import { Unauthorized } from "./unauthorized";

enum AddCategoryMessage {
  AddCategorySuccess = "ADD CATEGORY SUCCESS",
  CategoryAlreadyExists = "CATEGORY ALREADY EXISTS",
}

export namespace AddCategoryResponse {
  @ObjectType()
  export class AddCategory {
    constructor() {
      this.message = AddCategoryMessage.AddCategorySuccess;
    }

    @Field()
    message: string;
  }

  @ObjectType()
  export class CategoryAlreadyExists {
    constructor() {
      this.message = AddCategoryMessage.CategoryAlreadyExists;
    }

    @Field()
    message: string;
  }
}

const { AddCategory, CategoryAlreadyExists } = AddCategoryResponse;

export const AddCategoryResult = createUnionType({
  name: "AddCategoryResult",
  types: () => [AddCategory, CategoryAlreadyExists, BadRequest, Unauthorized] as const,
  resolveType: args => {
    switch (args.message) {
      case AddCategoryMessage.AddCategorySuccess: {
        return AddCategory;
      }
      case AddCategoryMessage.CategoryAlreadyExists: {
        return CategoryAlreadyExists;
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