import { FlexContainer } from "./FlexContainer";
import React from "react";

interface Props {
  children?: React.ReactNode;
}

export const FlexRowEndContainer: React.FC<Props> = ({ children }) => {
  return (
    <FlexContainer flexDirection="row" justifyContent="flex-end">
      {children}
    </FlexContainer>
  );
};

export default FlexRowEndContainer;
