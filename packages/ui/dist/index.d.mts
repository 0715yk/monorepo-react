import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, CSSProperties } from 'react';

declare const useSkipFirstRender: (callback: () => void, deps: any[]) => void;

declare class Either {
    _value: any;
    constructor(value: any);
    get value(): any;
    static left(a: any): Left;
    static right(a: any): Right;
    static fromNullable(val: any): Left | Right;
    static of(a: any): Right;
}
declare class Left extends Either {
    map(_: any): this;
    get value(): void;
    getOrElse(other: any): any;
    orElse(f: any): any;
    chain(f: any): this;
    getOrElseThrow(a: any): void;
    filter(f: any): this;
    toString(): any;
}
declare class Right extends Either {
    map(f: any): Right;
    get value(): any;
    getOrElse(other: any): any;
    orElse(): this;
    chain(f: any): any;
    getOrElseThrow(_: any): any;
    filter(f: any): Left | Right;
    toString(): any;
}

type ErrorMessage = string | undefined;
interface FormErrors {
    [key: string]: ErrorMessage;
}
interface FormData {
    [key: string]: string;
}
type Validator = (value: string) => Either;
interface ValidatorRef {
    [key: string]: Validator;
}
interface MetaData {
    [key: string]: {
        validators: Array<Validator>;
        required?: boolean;
    };
}

interface UseValidationProps {
    formData: FormData;
    metadata?: MetaData;
}
declare const useValidation: ({ formData, metadata }: UseValidationProps) => {
    errors: FormErrors;
    isFormValid: boolean;
};

declare const useScroll: () => boolean;

interface FlexContainerProps {
    children: ReactNode;
    gap?: number;
    alignItems?: CSSProperties["alignItems"];
    justifyContent?: CSSProperties["justifyContent"];
    flexDirection?: "row" | "column";
    width?: string;
    height?: string;
    style?: CSSProperties;
}
declare const FlexContainer: ({ children, gap, alignItems, justifyContent, flexDirection, height, width, style, }: FlexContainerProps) => react_jsx_runtime.JSX.Element;

export { type ErrorMessage, FlexContainer, type FormData, type FormErrors, type MetaData, type Validator, type ValidatorRef, useScroll, useSkipFirstRender, useValidation };
