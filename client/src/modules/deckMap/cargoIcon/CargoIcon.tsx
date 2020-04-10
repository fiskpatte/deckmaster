import React, { useRef } from "react";
import useReferenceScale from "../../../hooks/useReferenceScale";
import { ReactComponent as Icon } from "../../../assets/icons/cargoIcon.svg";
import "./CargoIcon.scss";

interface Props {
  x: number;
  y: number;
  height: number;
  width: number;
  placing?: boolean;
}

//This component uses {x,y} as LCG and TCG coordinates
export const CargoIcon: React.FC<Props> = ({
  x,
  y,
  width,
  height,
  placing = false,
}) => {
  const groupRef = useRef<SVGPathElement>(null);
  const scale = useReferenceScale(groupRef, { width, height });
  const corner = { x: x - width / 2, y: y - height / 2 };
  return (
    <svg
      width={width}
      height={height}
      x={corner.x}
      y={corner.y}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        ref={groupRef}
        className={`CargoIcon ${placing ? "Placing" : ""}`}
        transform={`scale(${scale.width} ${scale.height})`}
      >
        <Icon />
      </g>
    </svg>
  );
};

export default CargoIcon;
