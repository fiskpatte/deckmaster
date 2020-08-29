import React from "react";
import LaneComponent from "./PlacingLane";
import "./Lane.scss";
import { Lane, Cargo } from "../../../types/deckMap";
import { Placement } from "../../../types/util";

interface Props {
  lanes: Array<Lane>;
  rightOrigin: number;
  onLanePlacementButtonClick: (placement: Placement) => void;
  currentCargo: Cargo;
}

export const Lanes: React.FC<Props> = ({
  lanes,
  rightOrigin,
  onLanePlacementButtonClick,
  currentCargo
}) => {
  return (
    <>
      {lanes.map(lane => {
        return (
          <LaneComponent
            key={lane.id}
            lane={lane}
            onLanePlacementButtonClick={onLanePlacementButtonClick}
            rightOrigin={rightOrigin}
            currentCargo={currentCargo}
          />
        );
      })}
    </>
  );
};

export default Lanes;
