import React from "react";

interface Props {
  children?: React.ReactNode;
  flexDirection: "row" | "column";
  justifyContent?:
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "center"
    | "flex-start"
    | "flex-end";
  alignItems?: "flex-start" | "flex-end" | "center";
}

export const FlexContainer: React.FC<Props> = ({
  children,
  flexDirection,
  justifyContent,
  alignItems,
}) => (
  <div style={{ display: "flex", flexDirection, justifyContent, alignItems }}>
    {children}
  </div>
);

export default FlexContainer;
