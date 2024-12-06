import styled from "@emotion/styled";

interface FlexFrameProps {
  direction?: "row" | "column";
  gap?: number;
  justifyDirection?: "flex-start" | "center" | "space-between";
  width?: string;
  height?: string;
  alignItems?: "center" | "flex-start" | "stretch";
  wrap?: boolean;
}

export const FlexFrame = styled.div<FlexFrameProps>`
  display: flex;
  align-items: ${(props) => props.alignItems || "center"};
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justifyDirection || "flex-start"};
  gap: ${(props) => props.gap || 0}px;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  flex-wrap: ${(props) => (props.wrap ? "wrap" : "nowrap")};
`;
