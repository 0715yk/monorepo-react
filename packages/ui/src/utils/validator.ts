import { FormErrors } from "../types/validator";
import {
  alt,
  curry,
  Either,
  isValid,
  Left,
  pipe,
  Right,
  tap,
} from "@myorg/utils";

export const createFieldValidator = (
  field: keyof FormErrors,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
) => {
  const setFieldError = curry((type: string, message: string) => {
    setErrors((prev) => ({ ...prev, [type]: message }));
  });

  const setFieldErrorMessage = setFieldError(field);
  const resetFieldErrorMessage = () => setFieldErrorMessage("");

  const checkAndSetErrorMessage = curry(
    (validators: Array<(value: string) => Either>, value: string) =>
      (
        validators.reduce(
          (acc, validator) => acc.chain(validator),
          Either.right(value) as Right
        ) as Right | Left
      ).orElse(setFieldErrorMessage)
  );

  const createCheckField = (validators: Array<(value: string) => Either>) =>
    pipe(
      tap(resetFieldErrorMessage),
      alt(isValid, checkAndSetErrorMessage(validators), resetFieldErrorMessage)
    );

  return {
    setFieldErrorMessage,
    resetFieldErrorMessage,
    createCheckField,
  };
};
