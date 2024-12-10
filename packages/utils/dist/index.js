"use strict";
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
  Left: () => Left,
  Maybe: () => Maybe,
  Right: () => Right,
  Tuple: () => Tuple,
  alt: () => alt,
  asyncMap: () => asyncMap,
  asyncPipe: () => asyncPipe,
  asyncSome: () => asyncSome,
  curry: () => curry,
  fork: () => fork,
  identity: () => identity,
  isLengthValid: () => isLengthValid,
  isNotBlank: () => isNotBlank,
  isValidEmail: () => isValidEmail,
  isValidIntroduction: () => isValidIntroduction,
  isValidNickname: () => isValidNickname,
  isValidPassword: () => isValidPassword,
  isValidTag: () => isValidTag,
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
var Either = class _Either {
  constructor(value) {
    this._value = value;
  }
  get value() {
    return this._value;
  }
  static left(value) {
    return new Left(value);
  }
  static right(value) {
    return new Right(value);
  }
  static fromNullable(value, leftValue) {
    return value != null ? _Either.right(value) : _Either.left(leftValue);
  }
  static of(value) {
    return _Either.right(value);
  }
};
var Left = class extends Either {
  constructor(value) {
    super(value);
  }
  map(_) {
    return this;
  }
  get value() {
    throw new Error(`Cannot access value of Left: ${this._value}`);
  }
  getOrElse(defaultValue) {
    return defaultValue;
  }
  chain(_) {
    return this;
  }
  orElse(f) {
    return f(this._value);
  }
  toString() {
    return `Left(${this._value})`;
  }
};
var Right = class extends Either {
  constructor(value) {
    super(value);
  }
  map(f) {
    return Either.right(f(this._value));
  }
  get value() {
    return this._value;
  }
  getOrElse(_) {
    return this._value;
  }
  chain(f) {
    return f(this._value);
  }
  orElse(_) {
    return this;
  }
  toString() {
    return `Right(${this._value})`;
  }
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

// ../../node_modules/.pnpm/fp-ts@2.16.9/node_modules/fp-ts/es6/function.js
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
function identity2(a) {
  return a;
}
function pipe2(a, ab, bc, cd, de, ef, fg, gh, hi) {
  switch (arguments.length) {
    case 1:
      return a;
    case 2:
      return ab(a);
    case 3:
      return bc(ab(a));
    case 4:
      return cd(bc(ab(a)));
    case 5:
      return de(cd(bc(ab(a))));
    case 6:
      return ef(de(cd(bc(ab(a)))));
    case 7:
      return fg(ef(de(cd(bc(ab(a))))));
    case 8:
      return gh(fg(ef(de(cd(bc(ab(a)))))));
    case 9:
      return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
    default: {
      var ret = arguments[0];
      for (var i = 1; i < arguments.length; i++) {
        ret = arguments[i](ret);
      }
      return ret;
    }
  }
}
var dual = function(arity, body) {
  var isDataFirst = typeof arity === "number" ? function(args) {
    return args.length >= arity;
  } : arity;
  return function() {
    var args = Array.from(arguments);
    if (isDataFirst(arguments)) {
      return body.apply(this, args);
    }
    return function(self) {
      return body.apply(void 0, __spreadArray([self], args, false));
    };
  };
};

// ../../node_modules/.pnpm/fp-ts@2.16.9/node_modules/fp-ts/es6/internal.js
var isLeft = function(ma) {
  return ma._tag === "Left";
};
var left = function(e) {
  return { _tag: "Left", left: e };
};
var right = function(a) {
  return { _tag: "Right", right: a };
};

// ../../node_modules/.pnpm/fp-ts@2.16.9/node_modules/fp-ts/es6/Functor.js
function as(F) {
  return function(self, b) {
    return F.map(self, function() {
      return b;
    });
  };
}
function asUnit(F) {
  var asM = as(F);
  return function(self) {
    return asM(self, void 0);
  };
}

// ../../node_modules/.pnpm/fp-ts@2.16.9/node_modules/fp-ts/es6/Chain.js
function tap2(M) {
  return function(first, f) {
    return M.chain(first, function(a) {
      return M.map(f(a), function() {
        return a;
      });
    });
  };
}

// ../../node_modules/.pnpm/fp-ts@2.16.9/node_modules/fp-ts/es6/Either.js
var left2 = left;
var right2 = right;
var flatMap = /* @__PURE__ */ dual(2, function(ma, f) {
  return isLeft2(ma) ? ma : f(ma.right);
});
var _map = function(fa, f) {
  return pipe2(fa, map(f));
};
var _ap = function(fab, fa) {
  return pipe2(fab, ap(fa));
};
var URI = "Either";
var map = function(f) {
  return function(fa) {
    return isLeft2(fa) ? fa : right2(f(fa.right));
  };
};
var Functor = {
  URI,
  map: _map
};
var as2 = dual(2, as(Functor));
var asUnit2 = asUnit(Functor);
var apW = function(fa) {
  return function(fab) {
    return isLeft2(fab) ? fab : isLeft2(fa) ? fa : right2(fab.right(fa.right));
  };
};
var ap = apW;
var Chain = {
  URI,
  map: _map,
  ap: _ap,
  chain: flatMap
};
var FromEither = {
  URI,
  fromEither: identity2
};
var isLeft2 = isLeft;
var tap3 = /* @__PURE__ */ dual(2, tap2(Chain));
var _FromEither = {
  fromEither: FromEither.fromEither
};

// src/validation/index.ts
var isNotBlank = (value) => value.trim() !== "" ? right2(value) : left2("Value cannot be blank");
var isLengthValid = (min, max, message) => (value) => value.length >= min && value.length <= max ? right2(value) : left2(message);
var isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
var isValidNickname = (nickname) => {
  const nicknameRegex = /^[a-zA-Z0-9가-힣]{3,10}$/;
  return nicknameRegex.test(nickname);
};
var isValidPassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasValidLength = password.length >= 10 && password.length <= 20;
  return hasUpperCase && hasLowerCase && hasSpecialChar && hasValidLength;
};
var isValidTag = (tag) => {
  const tagRegex = /^[a-zA-Z0-9가-힣]{3,10}$/;
  return tagRegex.test(tag);
};
var isValidIntroduction = (intro) => {
  const trimmedLength = intro.replace(/\s/g, "").length;
  return trimmedLength >= 15;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Either,
  Left,
  Maybe,
  Right,
  Tuple,
  alt,
  asyncMap,
  asyncPipe,
  asyncSome,
  curry,
  fork,
  identity,
  isLengthValid,
  isNotBlank,
  isValidEmail,
  isValidIntroduction,
  isValidNickname,
  isValidPassword,
  isValidTag,
  partial,
  pipe,
  sequence,
  tap
});
