import React from "react";
import { DECK_MAP } from "../../../../shared/constants";
import ArrowIcon from "./ArrowIcon";
import { Lane } from "../../../../shared/types/deckMap";
import "./LaneButton.scss";

interface Props {
  lane: Lane;
  onClick: (event: React.MouseEvent<SVGElement>) => void;
  visible: boolean;
}

export const LaneButton: React.FC<Props> = ({ lane, onClick, visible }) => {
  if (!visible) return null;
  const buttonHeight = lane.width * DECK_MAP.LANE_BUTTON_HEIGHT_RATIO;
  const originX = lane.LCG - lane.length / 2 - DECK_MAP.LANE_BUTTON_WIDTH / 2;
  const originY = lane.TCG - buttonHeight / 2;
  return (
    <g onClick={onClick}>
      <rect
        x={originX}
        y={originY}
        width={DECK_MAP.LANE_BUTTON_WIDTH}
        height={buttonHeight}
        rx={DECK_MAP.LANE_BORDER_RADIUS}
        ry={DECK_MAP.LANE_BORDER_RADIUS}
        className="LaneButton"
      />
      <ArrowIcon
        x={originX}
        y={originY}
        width={DECK_MAP.LANE_BUTTON_WIDTH}
        height={buttonHeight}
      />
    </g>
  );
};

export default LaneButton;
