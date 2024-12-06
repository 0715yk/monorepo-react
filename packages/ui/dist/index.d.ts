import * as react from 'react';
import { InputHTMLAttributes } from 'react';
import * as _emotion_styled from '@emotion/styled';
import * as _emotion_react from '@emotion/react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
}
declare const Input: react.ForwardRefExoticComponent<InputProps & react.RefAttributes<HTMLInputElement>>;

interface FlexFrameProps {
    direction?: "row" | "column";
    gap?: number;
    justifyDirection?: "flex-start" | "center" | "space-between";
    width?: string;
    height?: string;
    alignItems?: "center" | "flex-start" | "stretch";
    wrap?: boolean;
}
declare const FlexFrame: _emotion_styled.StyledComponent<{
    theme?: _emotion_react.Theme;
    as?: React.ElementType;
} & FlexFrameProps, react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;

export { FlexFrame, Input, type InputProps };
