// src/Input/index.tsx
import { forwardRef } from "react";

// src/FlexFrame/index.tsx
import styled from "@emotion/styled";
var FlexFrame = styled.div`
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
import styled2 from "@emotion/styled";
var InputWrapper = styled2.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
var StyledInput = styled2.input`
  padding: 8px 12px;
  border: 1px solid ${(props) => props.hasError ? "red" : "#ccc"};
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.hasError ? "red" : "#0066ff"};
  }
`;
var Label = styled2.label`
  font-size: 14px;
  color: #333;
`;
var ErrorText = styled2.span`
  font-size: 12px;
  color: red;
`;

// src/Input/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Input = forwardRef(
  ({ error, label, ...props }, ref) => {
    return /* @__PURE__ */ jsxs(FlexFrame, { direction: "column", gap: 4, alignItems: "stretch", children: [
      label && /* @__PURE__ */ jsx(Label, { children: label }),
      /* @__PURE__ */ jsx(StyledInput, { ref, hasError: !!error, ...props }),
      error && /* @__PURE__ */ jsx(ErrorText, { children: error })
    ] });
  }
);
Input.displayName = "Input";
export {
  FlexFrame,
  Input
};
