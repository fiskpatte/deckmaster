import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { FlexContainer } from "../flexContainer";
import './WideCargoIcon.scss';

interface Props {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  height?: number | string;
}
export const WideCargoIconSVG: React.FC<Props> = ({ x = 0, y = 0, width = "100%", height = "100%" }) => {
  return (
    <svg
      x={x}
      y={y}
      width={width}
      height={height}
    // viewBox={`${0} ${0} ${width} ${height}`}
    // preserveAspectRatio="xMinYMin meet"
    >
      <FaLongArrowAltLeft className="WideCargoIconArrow" />
      <FaLongArrowAltRight x={"1em"} className="WideCargoIconArrow" />
    </svg>
  )
}

const WideCargoIcon: React.FC = () => {
  return (
    <FlexContainer>
      <FaLongArrowAltLeft className="WideCargoIconArrow" />
      <FaLongArrowAltRight className="WideCargoIconArrow" />
    </FlexContainer>
  );
};

export default WideCargoIcon;
