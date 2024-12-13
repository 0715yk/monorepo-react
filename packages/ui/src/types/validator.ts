import { Either } from "@myorg/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */

export type ErrorMessage = string | undefined;
export interface FormErrors {
  [key: string]: ErrorMessage;
}

export interface FormData {
  [key: string]: string;
}

export type Validator = (value: string) => Either;
export interface ValidatorRef {
  [key: string]: Validator;
}

export interface MetaData {
  [key: string]: {
    validators: Array<Validator>;
    required?: boolean;
  };
}
