import React from "react";
import LaneComponent from "./Lane";
import "./Lane.scss";
import { Lane, Cargo } from "../../../types/deckMap";
import { Placement } from "../../../types/util";

interface Props {
  lanes: Array<Lane>;
  svgRef: React.RefObject<SVGSVGElement>;
  rightOrigin: number;
  onClick: (event: React.MouseEvent | React.TouchEvent) => void;
  onButtonClick: (placement: Placement) => void;
  currentCargo: Cargo
}

export const Lanes: React.FC<Props> = ({
  lanes,
  svgRef,
  rightOrigin,
  onClick,
  onButtonClick,
  currentCargo
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
            currentCargo={currentCargo}
            svgRef={svgRef}
          />
        );
      })}
    </>
  );
};

export default Lanes;
