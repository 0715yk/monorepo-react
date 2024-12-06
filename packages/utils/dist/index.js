var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Either: () => Either,
  Maybe: () => Maybe,
  Tuple: () => Tuple,
  alt: () => alt,
  asyncMap: () => asyncMap,
  asyncPipe: () => asyncPipe,
  asyncSome: () => asyncSome,
  curry: () => curry,
  fork: () => fork,
  identity: () => identity,
  partial: () => partial,
  pipe: () => pipe,
  sequence: () => sequence,
  tap: () => tap
});
module.exports = __toCommonJS(src_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
