import { ObjectType, Field, createUnionType } from "type-graphql";
import { Unauthorized } from "./unauthorized";

enum GetCategoryListMessage {
  SuccessGetCategoryList = "SUCCESS GET CATEGORY LIST",
}

export namespace GetCategoryListResponse {
  @ObjectType()
  export class GetCategoryList {
    constructor(categoryList: object) {
      this.message = GetCategoryListMessage.SuccessGetCategoryList;
      this.categoryList = categoryList;
    }

    @Field()
    categoryList: object;

    @Field()
    message: string;
  }
}

const { GetCategoryList } = GetCategoryListResponse;

export const GetCategoryListResult = createUnionType({
  name: "GetCategoryListResult",
  types: () => [GetCategoryList, Unauthorized] as const,
  resolveType: args => {
    switch (args.message) {
      case GetCategoryListMessage.SuccessGetCategoryList: {
        return GetCategoryList;
      }
      case Unauthorized.getMessage(): {
        return Unauthorized;
      }
    }
  }
});