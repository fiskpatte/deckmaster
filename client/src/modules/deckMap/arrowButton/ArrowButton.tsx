import React from "react";
import { DECK_MAP } from "../../../constants";
import ArrowIcon from "./ArrowIcon";
import "./ArrowButton.scss";

interface Props {
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
  visible: boolean;
  color?: "green" | "violet";
  x: number;
  y: number;
  height: number;
  width: number;
  id?: string;
}

export const ArrowButton: React.FC<Props> = ({
  onClick = () => null,
  visible,
  color = "green",
  x,
  y,
  height,
  width,
  id = ""
}) => {
  if (!visible) return null;
  x -= width / 2;
  y -= height / 2;
  return (
    <g id={id} onClick={onClick}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={DECK_MAP.LANE_BORDER_RADIUS}
        ry={DECK_MAP.LANE_BORDER_RADIUS}
        className={`ArrowButton color-${color}`}
      />
      <ArrowIcon
        x={x}
        y={y}
        width={width}
        height={height}
      />
    </g>
  );
};

export default ArrowButton;
