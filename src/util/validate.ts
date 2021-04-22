import { Schema } from "joi";
import { UserInputError } from "apollo-server";

export const validateArguments = async (
  data,
  schema: Schema
): Promise<void> => {
  try {
    await schema.validateAsync(data);
  } catch (error) {
    throw new UserInputError("BAD REQUEST");
  }
};