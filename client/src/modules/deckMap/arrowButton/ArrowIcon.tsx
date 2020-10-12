import React, { useRef } from "react";
import { DECK_MAP } from "../../../constants";
import useReferenceScale from "../../../hooks/useReferenceScale";
import { ReactComponent as Icon } from "../../../assets/icons/arrowIcon.svg";

interface Props {
  x: number;
  y: number;
  height: number;
  width: number;
}

const ArrowIcon: React.FC<Props> = ({ x, y, width, height }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const arrowWidth = width * DECK_MAP.BUTTON_ARROW_RATIO;
  const arrowHeight = height * DECK_MAP.BUTTON_ARROW_RATIO;
  const { scale } = useReferenceScale(pathRef, {
    width: arrowWidth,
    height: arrowHeight
  });
  return (
    <svg
      width={width}
      height={height}
      x={x}
      y={y}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        ref={pathRef}
        transform={
          `scale(${scale.width} ${scale.height})
           translate(${(scale.width - 1) * arrowWidth * DECK_MAP.X_SCALE / 2} 
                     ${(scale.height - 1) * arrowHeight * DECK_MAP.Y_SCALE / 2}) 
          `
        }
      >
        <Icon />
      </g>
    </svg>
  );
};

export default ArrowIcon;
