// src/Input/styles.ts
import styled from "@emotion/styled";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledInput = styled.input<{ hasError?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${(props) => (props.hasError ? "red" : "#ccc")};
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "red" : "#0066ff")};
  }
`;

export const Label = styled.label`
  font-size: 14px;
  color: #333;
`;

export const ErrorText = styled.span`
  font-size: 12px;
  color: red;
`;
