declare const isValid: <T>(value: T) => boolean;
declare const isEitherValid: <T>(value: T) => Left | Right;
declare const pipe: (...fns: any[]) => (x: any) => any;
declare const curry: (fn: any) => (...args: any) => any;
declare const identity: (x: any) => any;
declare const partial: (fn: any, ...args: any[]) => (...moreArgs: any[]) => any;
declare const tap: (fn: any) => (x: any) => any;
declare const alt: (predicate: any, onTrue: any, onFalse: any) => (x: any) => any;
declare const sequence: (...fns: any[]) => (x: any) => any;
declare const fork: (join: any, fn1: any, fn2: any) => (x: any) => any;
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
declare const Tuple: <T extends any[]>(...items: T) => {
    get: <K extends keyof T>(index: K) => T[K];
    length: () => number;
    toString: () => string;
    [Symbol.iterator]: () => IterableIterator<T[number]>;
};
declare const asyncPipe: (...fns: any[]) => (x: any) => Promise<any>;
declare const asyncMap: (fn: any) => (arr: any[]) => Promise<unknown[]>;
declare const asyncSome: (fn: any) => (arr: any[]) => Promise<boolean>;
declare class IO {
    effect: any;
    constructor(effect: any);
    static of(a: any): IO;
    static from(fn: any): IO;
    map(fn: any): IO;
    chain(fn: any): any;
    run(): any;
}
declare const liftIO: (val: any) => IO;

declare const isValidIntroduction: (intro: string) => boolean;
declare const replaceAllBlack: (value: string) => string;
declare const checkStringLength: (...args: any) => any;
declare const checkSpeicalCharacter: (...args: any) => any;
declare const checkNicknameLength: any;
declare const checkNicknameCharacter: any;
declare const checkNicknameWhiteSpace: any;
declare const checkValidEmail: any;
declare const checkPasswordHasUpperCase: any;
declare const checkPasswordHasLowerCase: any;
declare const checkPasswordHasSpecificCharacters: any;
declare const checkPasswordLength: any;
declare const checkTagCharacter: any;
declare const checkIntroductionLength: (x: any) => any;

export { Either, IO, Left, Right, Tuple, alt, asyncMap, asyncPipe, asyncSome, checkIntroductionLength, checkNicknameCharacter, checkNicknameLength, checkNicknameWhiteSpace, checkPasswordHasLowerCase, checkPasswordHasSpecificCharacters, checkPasswordHasUpperCase, checkPasswordLength, checkSpeicalCharacter, checkStringLength, checkTagCharacter, checkValidEmail, curry, fork, identity, isEitherValid, isValid, isValidIntroduction, liftIO, partial, pipe, replaceAllBlack, sequence, tap };
