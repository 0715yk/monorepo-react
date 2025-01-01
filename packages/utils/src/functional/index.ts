// functional.ts
import _ from "lodash";

export const isValid = <T>(value: T) =>
  value !== undefined && value !== null && value !== "";

export const isEitherValid = <T>(value: T) =>
  value !== undefined && value !== null && value !== ""
    ? Either.right(value)
    : Either.left("Invalid value");

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
export class Maybe {
  static just(a: any) {
    return new Just(a);
  }
  static nothing() {
    return new Nothing();
  }
  static fromNullable(a: any): Maybe {
    return a !== null ? Maybe.just(a) : Maybe.nothing();
  }
  static of(a: any) {
    return this.just(a);
  }
  get isNothing() {
    return false;
  }
  get isJust() {
    return false;
  }
}

export class Just extends Maybe {
  _value: any;
  constructor(value: any) {
    super();
    this._value = value;
  }

  get value() {
    return this._value;
  }
  map(f: any) {
    return Maybe.fromNullable(f(this._value));
  }
  getOrElse() {
    return this._value;
  }
  filter(f: any) {
    Maybe.fromNullable(f(this._value) ? this._value : null);
  }
  chain(f: any) {
    return f(this._value);
  }
  toString() {
    return `Maybe.Just(${this._value})`;
  }
}

export class Nothing extends Maybe {
  _value: any;
  map(f: any) {
    return this;
  }
  get value() {
    throw new TypeError("Nothing 값을 가져올 수 없습니다.");
  }
  getOrElse(other: any) {
    return other;
  }
  filter(f: any) {
    return this._value;
  }
  chain(f: any) {
    return this;
  }
  toString() {
    return `Maybe.Nothing`;
  }
}

// Either 모나드
export class Either {
  _value: any;

  constructor(value: any) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  static left(a: any) {
    return new Left(a);
  }

  static right(a: any) {
    return new Right(a);
  }

  static fromNullable(val: any) {
    return isValid<any>(val) ? Either.right(val) : Either.left(val);
  }

  static of(a: any) {
    return Either.right(a);
  }
}

export class Left extends Either {
  map(_: any) {
    return this; // 쓰지 않음
  }

  get value() {
    throw new TypeError(this._value);
  }

  getOrElse(other: any) {
    return other;
  }

  orElse(f: any) {
    return f(this._value);
  }

  chain(f: any) {
    return this;
  }

  getOrElseThrow(a: any) {
    throw new Error(a);
  }

  filter(f: any) {
    return this;
  }

  toString() {
    return this._value;
  }
}

export class Right extends Either {
  map(f: any) {
    return Either.of(f(this._value));
  }

  get value() {
    return this._value;
  }

  getOrElse(other: any) {
    return this._value;
  }

  orElse() {
    return this; // 쓰지 않음
  }

  chain(f: any) {
    return f(this._value);
  }

  getOrElseThrow(_: any) {
    return this._value;
  }

  filter(f: any) {
    return Either.fromNullable(f(this._value) === null ? this._value : null);
  }

  toString() {
    return this._value;
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

export class IO {
  effect: any;

  constructor(effect: any) {
    if (!_.isFunction(effect)) {
      throw "IO 사용법: 함수는 필수입니다!";
    }
    this.effect = effect;
  }

  static of(a: any) {
    return new IO(() => a);
  }

  static lift(fn: any) {
    return new IO(() => fn());
  }

  static from(fn: any) {
    return new IO(fn);
  }

  map(fn: any) {
    let self = this;
    return new IO(() => fn(self.effect()));
  }

  chain(fn: any) {
    return fn(this.effect());
  }

  run() {
    return this.effect();
  }
}

export const liftIO = (val: any) => IO.of(val);
export const map = curry((fn: any, functor: any) => functor.map(fn));
export const chain = curry((fn: any, m: any) => m.chain(fn));

// 재귀함수의 메모리 비효율성을 최적화하면서 동시에 재귀 로직은 그대로 쓸 수 있는 헬퍼 함수.
export const trampoline = (fn: any) => {
  return function (...args: any) {
    let result = fn(...args);
    while (typeof result === "function") {
      result = result();
    }
    return result;
  };
};
