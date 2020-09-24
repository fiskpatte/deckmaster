import React from "react";
import { Frame } from "../../../types/deckMap";
import { arrayMin, arrayMax } from "../../../functions/math";
import FrameComponent from "./Frame";
import "./Frame.scss";
import { DECK_MAP } from "../../../constants";

interface Props {
  frames: Array<Frame>;
  originY: number;
}

interface Distances {
  minDistance: number;
  maxDistance: number;
}

export const FrameRuler: React.FC<Props> = ({ frames, originY }) => {
  const [distances, setDistances] = React.useState<Distances>();

  React.useEffect(() => {
    let frameDistances = frames.map((f) => f.distance);
    setDistances({
      minDistance: arrayMin(frameDistances),
      maxDistance: arrayMax(frameDistances),
    });
  }, [frames]);

  if (!distances) return null;

  return (
    <g>
      <rect
        className="FrameRuler"
        x={distances.minDistance}
        y={originY}
        width={distances.maxDistance - distances.minDistance}
        height={DECK_MAP.FRAME_HEIGHT}
      />
      {frames.map((f) => (
        <FrameComponent key={f.id} frame={f} originY={originY} />
      ))}
    </g>
  );
};

export default React.memo(FrameRuler);
