import * as E from "fp-ts/Either";

export const isNotBlank = (value: string): E.Either<string, string> =>
  value.trim() !== "" ? E.right(value) : E.left("Value cannot be blank");

export const isLengthValid =
  (min: number, max: number, message: string) =>
  (value: string): E.Either<string, string> =>
    value.length >= min && value.length <= max
      ? E.right(value)
      : E.left(message);
