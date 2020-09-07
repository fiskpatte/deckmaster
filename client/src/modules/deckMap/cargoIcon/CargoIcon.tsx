import React, { useRef } from "react";
import useReferenceScale from "../../../hooks/useReferenceScale";
import { ReactComponent as Icon } from "../../../assets/icons/cargoIcon.svg";
import "./CargoIcon.scss";
import { motion } from "framer-motion";
import usePrevious from '../../../hooks/usePrevious';

interface Props {
  x: number;
  y: number;
  height: number;
  width: number;
  cargoId: string;
  placing?: boolean;
}

//This component uses {x,y} as LCG and TCG coordinates
export const CargoIcon: React.FC<Props> = ({
  x,
  y,
  width,
  height,
  cargoId,
  placing = false
}) => {
  const groupRef = useRef<SVGPathElement>(null);
  const previousCargoId = usePrevious(cargoId);
  const newCargo = previousCargoId !== cargoId;
  const { scale } = useReferenceScale(groupRef, { width, height });

  const corner = { x: x - width / 2, y: y - height / 2 };
  return (
    <motion.svg
      dragMomentum={false}
      dragElastic={0}
      width={width}
      height={height}
      x={corner.x}
      y={corner.y}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      onClick={() => console.log(cargoId)}
    >
      <g ref={groupRef} className={`CargoIcon${placing ? " Placing" : ""}`}>
        <g
          transform={`scale(${newCargo ? 1 : scale.width} ${newCargo ? 1 : scale.height})`}
          style={{ pointerEvents: "none" }}
        >
          <Icon />
        </g>
        <rect
          x={0}
          y={0}
          height={height}
          width={width}
          className="BoundingBox"
        />
      </g>
    </motion.svg>
  );
};

export default CargoIcon;
