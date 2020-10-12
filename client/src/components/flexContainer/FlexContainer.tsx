import React from "react";

interface Props {
  children?: React.ReactNode;
  flexDirection?: "row" | "column";
  justifyContent?:
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "center"
  | "flex-start"
  | "flex-end";
  alignItems?: "flex-start" | "flex-end" | "center";
  onClick?: () => void;
  fullWidth?: boolean;
}

export const FlexContainer: React.FC<Props> = ({
  children,
  flexDirection = "row",
  justifyContent,
  alignItems,
  onClick,
  fullWidth = false
}) => (
    <div style={{ display: "flex", flexDirection, justifyContent, alignItems, width: fullWidth ? "100%" : "auto" }} onClick={onClick}>
      {children}
    </div>
  );

export default FlexContainer;
