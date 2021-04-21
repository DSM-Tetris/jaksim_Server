import { Schema } from "joi";
import { BadRequest } from "../dto";

export const ValidOf = (schema: Schema) => (
  target: any,
  name: string,
  index: number
) => {
  if (!(target[name].validates instanceof Array)) {
    target[name].validates = [];
  }
  target[name].validates.push((args) => schema.validateAsync(args[index]));
};

export const Validate = (
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) => {
  const { value: originMethod } = descriptor;
  const { validates } = originMethod;

  descriptor.value = async function (...args) {
    try {
      await Promise.all(validates.map((validate) => validate(args)));
      return originMethod.apply(this, args);
    } catch (e) {
      return new BadRequest();
    }
  };
};
