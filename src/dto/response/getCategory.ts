import { ObjectType, Field, createUnionType } from "type-graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { Unauthorized } from "./unauthorized";

enum GetCategoryListMessage {
  SuccessGetCategoryList = "SUCCESS GET CATEGORY LIST",
}

export namespace GetCategoryListResponse {
  export interface CategoryList {
    id: number | null;
    name: string;
    count: number;
  }

  @ObjectType()
  export class GetCategoryList {
    constructor(categoryList: CategoryList[]) {
      this.message = GetCategoryListMessage.SuccessGetCategoryList;
      this.categoryList = categoryList;
    }

    @Field(type => GraphQLJSONObject)
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