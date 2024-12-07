import { InputHTMLAttributes, forwardRef } from "react";
import { FlexContainer } from "../FlexContainer";
import { StyledInput, Label, ErrorText } from "./styles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, ...props }, ref) => {
    return (
      <FlexContainer gap={40} alignItems="center">
        {label && <Label>{label}</Label>}
        <StyledInput ref={ref} hasError={!!error} {...props} />
        {error && <ErrorText>{error}</ErrorText>}
      </FlexContainer>
    );
  }
);

Input.displayName = "Input";
