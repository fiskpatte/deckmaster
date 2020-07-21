import React, { useRef } from "react";
import { DECK_MAP } from "../../../../constants";
import useReferenceScale from "../../../../hooks/useReferenceScale";
import { Lane } from "../../../../types/deckMap";
import "./LaneName.scss";

interface Props {
  lane: Lane;
  rightOrigin: number;
}

export const LaneName: React.FC<Props> = ({ lane, rightOrigin }) => {
  const originX = rightOrigin - (3 * DECK_MAP.X_MARGIN) / 2;
  const textRef = useRef<SVGTextElement>(null);
  const { scale } = useReferenceScale(textRef, {
    width: DECK_MAP.LANE_NAME_WIDTH,
    height: lane.width,
  });
  let fontSize = Math.min(scale.width, scale.height);
  if (scale.height !== 1 && scale.width !== 1) {
    //Avoid changing the font size before the initial render so that the scale applies correctly
    fontSize *= DECK_MAP.LANE_NAME_FONT_SIZE;
  }
  return (
    <text
      className={`LaneName ${lane.partial ? "Hidden" : ""}`}
      transform={`scale(${1 / DECK_MAP.X_SCALE} ${1 / DECK_MAP.Y_SCALE})`}
      fontSize={`${fontSize}em`}
      x={originX * DECK_MAP.X_SCALE}
      y={lane.TCG * DECK_MAP.Y_SCALE}
      ref={textRef}
    >
      {lane.name}
    </text>
  );
};

export default LaneName;
