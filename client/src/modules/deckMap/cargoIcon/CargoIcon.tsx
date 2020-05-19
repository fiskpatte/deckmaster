import React, { useRef } from "react";
import useReferenceScale from "../../../hooks/useReferenceScale";
import { ReactComponent as Icon } from "../../../assets/icons/cargoIcon.svg";
import "./CargoIcon.scss";
import { motion } from 'framer-motion';

interface Props {
  x: number;
  y: number;
  height: number;
  width: number;
  placing?: boolean;
  dragCallback?: (info: MouseEvent | TouchEvent | PointerEvent) => void;
  dragEndCallback?: () => void;
}

//This component uses {x,y} as LCG and TCG coordinates
export const CargoIcon: React.FC<Props> = ({
  x,
  y,
  width,
  height,
  placing = false,
  dragCallback,
  dragEndCallback
}) => {
  const groupRef = useRef<SVGPathElement>(null);
  const scale = useReferenceScale(groupRef, { width, height });

  const handleDragStart = (event: any, info: any) => {
    console.log("START", event, info);//TODO: save dragOffset
  }

  const corner = { x: x - width / 2, y: y - height / 2 };
  return (
    <motion.svg
      drag={placing}
      onDragStart={(ev, info) => handleDragStart(ev, info)}
      onDrag={(event) => dragCallback && dragCallback(event)}
      onDragEnd={() => dragEndCallback && dragEndCallback()}
      dragMomentum={false}
      dragElastic={0}
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
      >
        <g transform={`scale(${scale.width} ${scale.height})`} style={{ pointerEvents: "none" }} >
          <Icon />
        </g>
        <rect
          x={0}
          y={0}
          height={height}
          width={width}
          className="BoundingBox" />
      </g>
    </motion.svg >
  );
};

export default CargoIcon;