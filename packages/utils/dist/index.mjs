// src/functional/index.ts
var pipe = (...fns) => {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
};
var curry = (fn) => {
  return function curried(...args) {
    return args.length >= fn.length ? fn(...args) : (...args2) => curried(...args, ...args2);
  };
};
var identity = (x) => x;
var partial = (fn, ...args) => {
  return (...moreArgs) => fn(...args, ...moreArgs);
};
var tap = (fn) => (x) => {
  fn(x);
  return x;
};
var alt = (predicate, onTrue, onFalse) => (x) => predicate(x) ? onTrue(x) : onFalse(x);
var sequence = (...fns) => (x) => {
  fns.forEach((fn) => fn(x));
  return x;
};
var fork = (join, fn1, fn2) => (x) => join(fn1(x), fn2(x));
var Maybe = {
  just: (x) => ({
    map: (fn) => Maybe.just(fn(x)),
    chain: (fn) => fn(x),
    getOrElse: () => x,
    isNothing: () => false,
    toString: () => `Just(${x})`
  }),
  nothing: () => ({
    map: () => Maybe.nothing(),
    chain: () => Maybe.nothing(),
    getOrElse: (defaultValue) => defaultValue,
    isNothing: () => true,
    toString: () => "Nothing"
  }),
  fromNullable: (x) => x == null ? Maybe.nothing() : Maybe.just(x)
};
var Either = {
  left: (x) => ({
    map: () => Either.left(x),
    chain: () => Either.left(x),
    getOrElse: (defaultValue) => defaultValue,
    isLeft: () => true,
    isRight: () => false,
    toString: () => `Left(${x})`
  }),
  right: (x) => ({
    map: (fn) => Either.right(fn(x)),
    chain: (fn) => fn(x),
    getOrElse: () => x,
    isLeft: () => false,
    isRight: () => true,
    toString: () => `Right(${x})`
  })
};
var Tuple = (...items) => {
  const _items = items;
  return {
    get: (index) => _items[index],
    length: () => _items.length,
    toString: () => `(${_items.join(", ")})`,
    [Symbol.iterator]: function* () {
      yield* _items;
    }
  };
};
var asyncPipe = (...fns) => {
  return async (x) => {
    return fns.reduce(async (acc, fn) => fn(await acc), x);
  };
};
var asyncMap = (fn) => async (arr) => {
  return Promise.all(arr.map(fn));
};
var asyncSome = (fn) => async (arr) => {
  const results = await Promise.all(arr.map(fn));
  return results.some((x) => x);
};
export {
  Either,
  Maybe,
  Tuple,
  alt,
  asyncMap,
  asyncPipe,
  asyncSome,
  curry,
  fork,
  identity,
  partial,
  pipe,
  sequence,
  tap
};
