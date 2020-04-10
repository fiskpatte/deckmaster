import React from "react";
import LaneComponent from "./Lane";
import "./Lane.scss";
import { Lane } from "../../../types/deckMap";
import { Coords } from "../../../types/util";

interface Props {
  lanes: Array<Lane>;
  svgRef: React.RefObject<SVGSVGElement>;
  rightOrigin: number;
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  onButtonClick: (position: Coords, laneID: number) => void;
}

export const Lanes: React.FC<Props> = ({
  lanes,
  svgRef,
  rightOrigin,
  onClick,
  onButtonClick,
}) => {
  return (
    <>
      {lanes.map((lane, ix) => {
        return (
          <LaneComponent
            key={ix}
            lane={lane}
            onClick={onClick}
            onButtonClick={onButtonClick}
            rightOrigin={rightOrigin}
            svgRef={svgRef}
          />
        );
      })}
    </>
  );
};

export default Lanes;
