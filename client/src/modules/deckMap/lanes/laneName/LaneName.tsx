import React from "react";
import { DECK_MAP } from "../../../../constants";
import { Lane } from "../../../../types/deckMap";
import "./LaneName.scss";

interface Props {
  lane: Lane;
  rightOrigin: number;
}

export const LaneName: React.FC<Props> = ({ lane, rightOrigin }) => {
  const originX = rightOrigin - DECK_MAP.LANE_NAME_MARGIN;

  return (
    <text
      className={`LaneName ${lane.partial ? "Hidden" : ""}`}
      transform={`scale(${1 / DECK_MAP.X_SCALE} ${1 / DECK_MAP.Y_SCALE})`}
      fontSize={`${DECK_MAP.LANE_NAME_FONT_SIZE}em`}
      x={originX * DECK_MAP.X_SCALE}
      y={lane.TCG * DECK_MAP.Y_SCALE}
    >
      {lane.name}
    </text>
  );
};

export default LaneName;
