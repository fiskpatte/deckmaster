import React from "react";
import LaneComponent from "./Lane";
import "./Lane.scss";
import { Lane, Cargo, CargoPlacement, MostForwardValidPlacementForLanes } from "../../../types/deckMap";

interface Props {
  lanes: Array<Lane>;
  rightOrigin: number;
  onLanePlacementButtonClick: (placement: CargoPlacement) => void;
  currentCargo: Cargo;
  mostForwardValidPlacementForLanes: MostForwardValidPlacementForLanes;
}

export const Lanes: React.FC<Props> = ({
  lanes,
  rightOrigin,
  onLanePlacementButtonClick,
  currentCargo,
  mostForwardValidPlacementForLanes
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
            mostForwardValidPlacementForLane={mostForwardValidPlacementForLanes[lane.id]}
          />
        );
      })}
    </>
  );
};

export default Lanes;
