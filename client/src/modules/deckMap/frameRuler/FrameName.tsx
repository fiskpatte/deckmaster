import * as React from "react";
import { Frame } from "../../../types/deckMap";
import { DECK_MAP } from "../../../constants";

interface Props {
  frame: Frame;
  originY: number;
}
export const FrameName: React.FC<Props> = ({ frame, originY }) => {

  return (
    <text
      className="FrameName"
      transform={`scale(${1 / DECK_MAP.X_SCALE} ${1 / DECK_MAP.Y_SCALE})`}
      fontSize={`${DECK_MAP.FRAME_NAME_FONT_SIZE}em`}
      x={frame.distance * DECK_MAP.X_SCALE}
      y={(originY + 2 * DECK_MAP.FRAME_HEIGHT) * DECK_MAP.Y_SCALE}
    >
      {frame.id}
    </text>
  );
};

export default FrameName;
