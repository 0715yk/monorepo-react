import { useCallback } from "react";
import * as E from "fp-ts/Either";

type ValidationFn<T> = (value: T) => E.Either<string, T>;

export const useValidation = <T>(validationHandlers: {
  [K in keyof T]: ValidationFn<T[K]>[];
}) => {
  const validate = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      const handlers = validationHandlers[key];

      return handlers.reduce(
        (acc, validator) => E.chain(validator)(acc),
        E.right(value) as E.Either<string, T[K]>
      );
    },
    [validationHandlers]
  );

  return { validate };
};
