// functional.ts

// 기본적인 함수형 유틸리티
export const pipe = (...fns: any[]) => {
  return (x: any) => fns.reduce((acc, fn) => fn(acc), x);
};

/*
// example
const addOne = (x: number) => x + 1;
const double = (x: number) => x * 2;
const result = pipe(addOne, double)(5); // (5 + 1) * 2 = 12
*/

export const curry = (fn: any) => {
  return function curried(...args: any) {
    return args.length >= fn.length
      ? fn(...args)
      : (...args2: any) => curried(...args, ...args2);
  };
};

/*
const add = (a: number, b: number, c: number) => a + b + c;
const curriedAdd = curry(add);
curriedAdd(1)(2)(3); // 6
 */

export const identity = (x: any) => x;

export const partial = (fn: any, ...args: any[]) => {
  return (...moreArgs: any[]) => fn(...args, ...moreArgs);
};

// 데이터 흐름 제어
export const tap = (fn: any) => (x: any) => {
  fn(x);
  return x;
};

export const alt = (predicate: any, onTrue: any, onFalse: any) => (x: any) =>
  predicate(x) ? onTrue(x) : onFalse(x);

export const sequence =
  (...fns: any[]) =>
  (x: any) => {
    fns.forEach((fn) => fn(x));
    return x;
  };

export const fork = (join: any, fn1: any, fn2: any) => (x: any) =>
  join(fn1(x), fn2(x));

// Maybe 모나드
export const Maybe = {
  just: (x: any) => ({
    map: (fn: any) => Maybe.just(fn(x)),
    chain: (fn: any) => fn(x),
    getOrElse: () => x,
    isNothing: () => false,
    toString: () => `Just(${x})`,
  }),
  nothing: () => ({
    map: () => Maybe.nothing(),
    chain: () => Maybe.nothing(),
    getOrElse: (defaultValue: any) => defaultValue,
    isNothing: () => true,
    toString: () => "Nothing",
  }),
  fromNullable: (x: any) => (x == null ? Maybe.nothing() : Maybe.just(x)),
};

/*
const safeDivide = (n: number) => (d: number) =>
 d === 0 ? Maybe.nothing() : Maybe.just(n / d);

const result = Maybe.just(10)
 .chain(safeDivide(100)) // Just(10)
 .getOrElse(0);
*/

// Either 모나드
export class Either<L, R> {
  protected _value: L | R;

  constructor(value: L | R) {
    this._value = value;
  }

  get value(): L | R {
    return this._value;
  }

  static left<L, R>(value: L): Either<L, R> {
    return new Left(value);
  }

  static right<L, R>(value: R): Either<L, R> {
    return new Right(value);
  }

  static fromNullable<L, R>(
    value: R | null | undefined,
    leftValue: L
  ): Either<L, R> {
    return value != null
      ? Either.right<L, R>(value)
      : Either.left<L, R>(leftValue);
  }

  static of<R>(value: R): Either<never, R> {
    return Either.right<never, R>(value);
  }
}

export class Left<L, R> extends Either<L, R> {
  constructor(value: L) {
    super(value);
  }

  map(_: (value: R) => any): this {
    return this;
  }

  get value(): L {
    throw new Error(`Cannot access value of Left: ${this._value}`);
  }

  getOrElse(defaultValue: R): R {
    return defaultValue;
  }

  chain(_: (value: R) => Either<L, any>): this {
    return this;
  }

  orElse(f: (value: L) => Either<L, R>): Either<L, R> {
    return f(this._value as L);
  }

  toString(): string {
    return `Left(${this._value})`;
  }
}

export class Right<L, R> extends Either<L, R> {
  constructor(value: R) {
    super(value);
  }

  map<T>(f: (value: R) => T): Either<L, T> {
    return Either.right<L, T>(f(this._value as R));
  }

  get value(): R {
    return this._value as R;
  }

  getOrElse(_: R): R {
    return this._value as R;
  }

  chain<T>(f: (value: R) => Either<L, T>): Either<L, T> {
    return f(this._value as R);
  }

  orElse(_: (value: L) => Either<L, R>): this {
    return this;
  }

  toString(): string {
    return `Right(${this._value})`;
  }
}
/* 
const safeDivideEither = (n: number) => (d: number) =>
 d === 0 ? Either.left('Division by zero') : Either.right(n / d);
*/

// 튜플
export const Tuple = <T extends any[]>(...items: T) => {
  const _items = items;

  return {
    get: <K extends keyof T>(index: K): T[K] => _items[index],
    length: (): number => _items.length,
    toString: (): string => `(${_items.join(", ")})`,
    [Symbol.iterator]: function* (): IterableIterator<T[number]> {
      yield* _items;
    },
  };
};

// 비동기 유틸리티
export const asyncPipe = (...fns: any[]) => {
  return async (x: any) => {
    return fns.reduce(async (acc, fn) => fn(await acc), x);
  };
};

/*
const fetchUser = async (id: number) => ({ id, name: 'John' });
const getAddress = async (user: any) => ({ ...user, address: '123 St' });

const getUserData = asyncPipe(
 fetchUser,
 getAddress
*/

export const asyncMap = (fn: any) => async (arr: any[]) => {
  return Promise.all(arr.map(fn));
};

export const asyncSome = (fn: any) => async (arr: any[]) => {
  const results = await Promise.all(arr.map(fn));
  return results.some((x) => x);
};
