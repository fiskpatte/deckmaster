import React, { useRef } from "react";
import { DECK_MAP } from "../../../../constants";
import useReferenceScale from "../../../../hooks/useReferenceScale";
import { ReactComponent as Icon } from "../../../../assets/icons/arrowIcon.svg";

interface Props {
  x: number;
  y: number;
  height: number;
  width: number;
}

const ArrowIcon: React.FC<Props> = ({ x, y, width, height }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const { scale } = useReferenceScale(pathRef, {
    width: width * DECK_MAP.BUTTON_ARROW_RATIO,
    height: height * DECK_MAP.BUTTON_ARROW_RATIO,
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
        transform={`scale(${scale.width} ${scale.height}) translate(${
          (-width / 2) * DECK_MAP.X_SCALE
          } ${(-height / 2) * DECK_MAP.Y_SCALE})`}
      >
        <Icon />
      </g>
    </svg>
  );
};

export default ArrowIcon;
