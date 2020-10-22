import React from "react";
import LaneComponent from "./Lane";
import "./Lane.scss";
import { Lane, Cargo, MostForwardValidPlacementForLanes } from "../../../types/deckMap";

interface Props {
  lanes: Array<Lane>;
  rightOrigin: number;
  currentCargo: Cargo;
  mostForwardValidPlacementForLanes: MostForwardValidPlacementForLanes;
}

export const Lanes: React.FC<Props> = ({
  lanes,
  rightOrigin,
  currentCargo,
  mostForwardValidPlacementForLanes,
}) => {
  return (
    <>
      {lanes.map(lane => {
        return (
          <LaneComponent
            key={lane.id}
            lane={lane}
            rightOrigin={rightOrigin}
            currentCargo={currentCargo}
            mostForwardValidPlacementForLane={mostForwardValidPlacementForLanes[lane.id]}
          />
        );
      })}
    </>
  );
};

export default Lanes;
