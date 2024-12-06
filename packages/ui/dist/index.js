var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  FlexFrame: () => FlexFrame,
  Input: () => Input
});
module.exports = __toCommonJS(src_exports);

// src/Input/index.tsx
var import_react = require("react");

// src/FlexFrame/index.tsx
var import_styled = __toESM(require("@emotion/styled"));
var FlexFrame = import_styled.default.div`
  display: flex;
  align-items: ${(props) => props.alignItems || "center"};
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justifyDirection || "flex-start"};
  gap: ${(props) => props.gap || 0}px;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  flex-wrap: ${(props) => props.wrap ? "wrap" : "nowrap"};
`;

// src/Input/styles.ts
var import_styled2 = __toESM(require("@emotion/styled"));
var InputWrapper = import_styled2.default.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
var StyledInput = import_styled2.default.input`
  padding: 8px 12px;
  border: 1px solid ${(props) => props.hasError ? "red" : "#ccc"};
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.hasError ? "red" : "#0066ff"};
  }
`;
var Label = import_styled2.default.label`
  font-size: 14px;
  color: #333;
`;
var ErrorText = import_styled2.default.span`
  font-size: 12px;
  color: red;
`;

// src/Input/index.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Input = (0, import_react.forwardRef)(
  ({ error, label, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FlexFrame, { direction: "column", gap: 4, alignItems: "stretch", children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyledInput, { ref, hasError: !!error, ...props }),
      error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorText, { children: error })
    ] });
  }
);
Input.displayName = "Input";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FlexFrame,
  Input
});
