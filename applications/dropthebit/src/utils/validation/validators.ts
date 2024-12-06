import { pipe } from "fp-ts/function";
import * as E from "fp-ts/Either";

const isNotBlank = (value: string): E.Either<string, string> =>
  value.trim() !== "" ? E.right(value) : E.left("Value cannot be blank");

const isLengthValid =
  (min: number, max: number) =>
  (value: string): E.Either<string, string> =>
    value.length >= min && value.length <= max
      ? E.right(value)
      : E.left(`Value must be between ${min} and ${max} characters`);

const validateNickname = (nickname: string) =>
  pipe(E.right(nickname), E.chain(isNotBlank), E.chain(isLengthValid(3, 16)));

const nicknameResult = validateNickname("JohnDoe");

if (E.isRight(nicknameResult)) {
  console.log("Valid nickname:", nicknameResult.right);
} else {
  console.error("Error:", nicknameResult.left);
}
