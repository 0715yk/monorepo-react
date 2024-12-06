import { InputHTMLAttributes, forwardRef } from "react";
import { FlexFrame } from "../FlexFrame";
import { StyledInput, Label, ErrorText } from "./styles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, ...props }, ref) => {
    return (
      <FlexFrame gap={40} alignItems="center">
        {label && <Label>{label}</Label>}
        <StyledInput ref={ref} hasError={!!error} {...props} />
        {error && <ErrorText>{error}</ErrorText>}
      </FlexFrame>
    );
  }
);

Input.displayName = "Input";
