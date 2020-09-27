import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { FlexContainer } from "../flexContainer";

const WideCargoIcon: React.FC = () => {
  return (
    <FlexContainer>
      <FaLongArrowAltLeft color="red" />
      <FaLongArrowAltRight color="red" />
    </FlexContainer>
  );
};

export default WideCargoIcon;
