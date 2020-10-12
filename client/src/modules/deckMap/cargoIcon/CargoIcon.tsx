import React, { useRef } from "react";
import useReferenceScale from "../../../hooks/useReferenceScale";
import { ReactComponent as Icon } from "../../../assets/icons/cargoIcon.svg";
import "./CargoIcon.scss";
import { motion } from "framer-motion";
import usePrevious from './../../../hooks/usePrevious';
import { DECK_MAP } from "../../../constants";
import { WideCargoIconSVG } from "../../../components/wideCargoIcon/WideCargoIcon";

interface Props {
  x: number;
  y: number;
  height: number;
  width: number;
  placing?: boolean;
  dragCallback?: (info: MouseEvent | TouchEvent | PointerEvent) => void;
  dragEndCallback?: () => void;
  cargoId: string;
  registrationNumber: string;
}

//This component uses {x,y} as LCG and TCG coordinates
export const CargoIcon: React.FC<Props> = ({
  x,
  y,
  width,
  height,
  placing = false,
  dragCallback,
  dragEndCallback,
  cargoId,
  registrationNumber
}) => {
  const groupRef = useRef<SVGPathElement>(null);
  const previousCargoId = usePrevious(cargoId);
  const newCargo = previousCargoId !== cargoId;
  const { scale } = useReferenceScale(groupRef, { width, height });
  // let fontSize = Math.min(scale.width, scale.height);
  // if (scale.height !== 1 && scale.width !== 1) {
  //   //Avoid changing the font size before the initial render so that the scale applies correctly
  //   fontSize *= DECK_MAP.GRID_NAME_FONT_SIZE;
  // }
  // const handleDragStart = (event: any, info: any) => {
  //   console.log("START", event, info); //TODO: save dragOffset
  // };

  const corner = { x: x - width / 2, y: y - height / 2 };
  return (
    <motion.svg
      drag={placing}
      // onDragStart={(ev, info) => handleDragStart(ev, info)}
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
      onClick={() => console.log(cargoId)}
    >
      <g ref={groupRef} className={`CargoIcon ${placing ? "Placing" : ""}`}>
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
          rx={DECK_MAP.LANE_BORDER_RADIUS}
          ry={DECK_MAP.LANE_BORDER_RADIUS}
          className={`BoundingBox ${placing ? "Placing" : ""}`}
        />
        <WideCargoIconSVG />

        <text
          className="CargoRegistrationNumber"
          x={DECK_MAP.X_SCALE * width / 2}
          y={DECK_MAP.Y_SCALE * height / 2}
          fontSize={`${DECK_MAP.CARGO_ICON_REGISTRATION_NUMBER_SIZE}em`}
          transform={`scale(${1 / DECK_MAP.X_SCALE} ${1 / DECK_MAP.Y_SCALE})`}
        >
          {registrationNumber}
        </text>
      </g>
    </motion.svg>
  );
};

export default CargoIcon;
