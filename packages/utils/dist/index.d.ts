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
declare const Either: {
    left: (x: any) => {
        map: () => /*elided*/ any;
        chain: () => /*elided*/ any;
        getOrElse: (defaultValue: any) => any;
        isLeft: () => boolean;
        isRight: () => boolean;
        toString: () => string;
    };
    right: (x: any) => {
        map: (fn: any) => /*elided*/ any;
        chain: (fn: any) => any;
        getOrElse: () => any;
        isLeft: () => boolean;
        isRight: () => boolean;
        toString: () => string;
    };
};
declare const Tuple: <T extends any[]>(...items: T) => {
    get: <K extends keyof T>(index: K) => T[K];
    length: () => number;
    toString: () => string;
    [Symbol.iterator]: () => IterableIterator<T[number]>;
};
declare const asyncPipe: (...fns: any[]) => (x: any) => Promise<any>;
declare const asyncMap: (fn: any) => (arr: any[]) => Promise<unknown[]>;
declare const asyncSome: (fn: any) => (arr: any[]) => Promise<boolean>;

export { Either, Maybe, Tuple, alt, asyncMap, asyncPipe, asyncSome, curry, fork, identity, partial, pipe, sequence, tap };
