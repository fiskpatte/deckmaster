import React from "react";
import LaneComponent from "./Lane";
import "./Lane.scss";
import {
  Lane,
  Cargo,
  MostForwardValidPlacementForLanes,
  CargoPlacement,
} from "../../../types/deckMap";

interface Props {
  lanes: Array<Lane>;
  rightOrigin: number;
  currentCargo: Cargo;
  mostForwardValidPlacementForLanes: MostForwardValidPlacementForLanes;
  onLaneButtonClick: (placement: CargoPlacement) => void;
}

export const Lanes: React.FC<Props> = ({
  lanes,
  rightOrigin,
  currentCargo,
  mostForwardValidPlacementForLanes,
  onLaneButtonClick,
}) => {
  return (
    <>
      {lanes.map((lane) => {
        return (
          <LaneComponent
            key={lane.id}
            lane={lane}
            rightOrigin={rightOrigin}
            currentCargo={currentCargo}
            mostForwardValidPlacementForLane={
              mostForwardValidPlacementForLanes[lane.id]
            }
            onLaneButtonClick={onLaneButtonClick}
          />
        );
      })}
    </>
  );
};

export default Lanes;
