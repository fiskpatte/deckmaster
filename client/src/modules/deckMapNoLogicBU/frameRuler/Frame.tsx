import * as React from "react";
import { Frame } from "../../../types/deckMap";
import "./Frame.scss";
import FrameTick from "./FrameTick";
import FrameName from "./FrameName";

interface Props {
  frame: Frame;
  originY: number;
}

const bigFrameFrequency = 20;
const mediumFrameFrequency = bigFrameFrequency / 2;
export const FrameComponent: React.FC<Props> = ({ frame, originY }) => {
  let isBig = frame.id % bigFrameFrequency === 0;
  let isMedium = frame.id % mediumFrameFrequency === 0;
  return (
    <g>
      <FrameTick
        x={frame.distance}
        y={originY}
        isBig={isBig}
        isMedium={isMedium}
      />
      {isBig ? <FrameName frame={frame} originY={originY} /> : null}
    </g>
  );
};

export default FrameComponent;
