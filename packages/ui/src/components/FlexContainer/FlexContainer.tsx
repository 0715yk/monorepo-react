import styles from "./FlexContainer.module.scss";
import React, { CSSProperties, ReactNode } from "react";

interface FlexContainerProps {
  children: ReactNode;
  gap?: number;
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  flexDirection?: "row" | "column";
  width?: string;
  height?: string;
  style?: CSSProperties;
}

export const FlexContainer = ({
  children,
  gap = 0,
  alignItems = "center",
  justifyContent = "center",
  flexDirection = "row",
  height,
  width,
  style,
}: FlexContainerProps) => {
  const dynamicStyles: CSSProperties = {
    ...style,
    gap: `${gap}px`,
    alignItems,
    justifyContent,
    flexDirection,
    height,
    width,
  };

  return (
    <div className={styles.container} style={dynamicStyles}>
      {children}
    </div>
  );
};
