import * as react from 'react';
import { InputHTMLAttributes } from 'react';
import * as _emotion_styled from '@emotion/styled';
import * as _emotion_react from '@emotion/react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
}
declare const Input: react.ForwardRefExoticComponent<InputProps & react.RefAttributes<HTMLInputElement>>;

interface FlexFrameProps {
    direction?: "row" | "column";
    gap?: number;
    justifyDirection?: "flex-start" | "center" | "space-between";
    width?: string;
    height?: string;
    alignItems?: "center" | "flex-start" | "stretch";
    wrap?: boolean;
}
declare const FlexFrame: _emotion_styled.StyledComponent<{
    theme?: _emotion_react.Theme;
    as?: React.ElementType;
} & FlexFrameProps, react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

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

export { type ErrorMessage, FlexFrame, type FormData, type FormErrors, Input, type InputProps, type MetaData, type Validator, type ValidatorRef, useSkipFirstRender, useValidation };
