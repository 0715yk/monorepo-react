import * as E from 'fp-ts/Either';

declare const pipe: (...fns: any[]) => (x: any) => any;
declare const curry: (fn: any) => (...args: any) => any;
declare const identity: (x: any) => any;
declare const partial: (fn: any, ...args: any[]) => (...moreArgs: any[]) => any;
declare const tap: (fn: any) => (x: any) => any;
declare const alt: (predicate: any, onTrue: any, onFalse: any) => (x: any) => any;
declare const sequence: (...fns: any[]) => (x: any) => any;
declare const fork: (join: any, fn1: any, fn2: any) => (x: any) => any;
declare const Maybe: {
    just: (x: any) => {
        map: (fn: any) => /*elided*/ any;
        chain: (fn: any) => any;
        getOrElse: () => any;
        isNothing: () => boolean;
        toString: () => string;
    };
    nothing: () => {
        map: () => /*elided*/ any;
        chain: () => /*elided*/ any;
        getOrElse: (defaultValue: any) => any;
        isNothing: () => boolean;
        toString: () => string;
    };
    fromNullable: (x: any) => {
        map: (fn: any) => /*elided*/ any;
        chain: (fn: any) => any;
        getOrElse: () => any;
        isNothing: () => boolean;
        toString: () => string;
    } | {
        map: () => /*elided*/ any;
        chain: () => /*elided*/ any;
        getOrElse: (defaultValue: any) => any;
        isNothing: () => boolean;
        toString: () => string;
    };
};
declare class Either<L, R> {
    protected _value: L | R;
    constructor(value: L | R);
    get value(): L | R;
    static left<L, R>(value: L): Either<L, R>;
    static right<L, R>(value: R): Either<L, R>;
    static fromNullable<L, R>(value: R | null | undefined, leftValue: L): Either<L, R>;
    static of<R>(value: R): Either<never, R>;
}
declare class Left<L, R> extends Either<L, R> {
    constructor(value: L);
    map(_: (value: R) => any): this;
    get value(): L;
    getOrElse(defaultValue: R): R;
    chain(_: (value: R) => Either<L, any>): this;
    orElse(f: (value: L) => Either<L, R>): Either<L, R>;
    toString(): string;
}
declare class Right<L, R> extends Either<L, R> {
    constructor(value: R);
    map<T>(f: (value: R) => T): Either<L, T>;
    get value(): R;
    getOrElse(_: R): R;
    chain<T>(f: (value: R) => Either<L, T>): Either<L, T>;
    orElse(_: (value: L) => Either<L, R>): this;
    toString(): string;
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

declare const isNotBlank: (value: string) => E.Either<string, string>;
declare const isLengthValid: (min: number, max: number, message: string) => (value: string) => E.Either<string, string>;
declare const isValidEmail: (email: string) => boolean;
declare const isValidNickname: (nickname: string) => boolean;
declare const isValidPassword: (password: string) => boolean;
declare const isValidTag: (tag: string) => boolean;
declare const isValidIntroduction: (intro: string) => boolean;

export { Either, Left, Maybe, Right, Tuple, alt, asyncMap, asyncPipe, asyncSome, curry, fork, identity, isLengthValid, isNotBlank, isValidEmail, isValidIntroduction, isValidNickname, isValidPassword, isValidTag, partial, pipe, sequence, tap };
