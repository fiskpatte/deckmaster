import React from "react";
import LaneComponent from "./Lane";
import "./Lane.scss";
import {
  Lane,
  Cargo,
  ValidPlacementIntervalsForLanes,
} from "../../../types/deckMap";

interface Props {
  lanes: Array<Lane>;
  rightOrigin: number;
  currentCargo: Cargo;
  validPlacementIntervalsForLanes: ValidPlacementIntervalsForLanes;
  onLaneClick: (
    event: React.MouseEvent | React.TouchEvent | React.PointerEvent,
    lane: Lane
  ) => void;
}

export const Lanes: React.FC<Props> = ({
  lanes,
  rightOrigin,
  currentCargo,
  validPlacementIntervalsForLanes,
  onLaneClick,
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
            validPlacementIntervalsForLane={
              validPlacementIntervalsForLanes[lane.id]
            }
            onLaneClick={onLaneClick}
          />
        );
      })}
    </>
  );
};

export default Lanes;
