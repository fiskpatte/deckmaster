import React from "react";
import GridComponent from "./Grid";
import {
  Grid,
  Cargo,
  ValidPlacementIntervalsForLanes,
} from "../../../types/deckMap";

interface Props {
  grids: Array<Grid>;
  onClick: (grid: Grid) => void;
  currentCargo: Cargo;
  validPlacementIntervalsForLanes: ValidPlacementIntervalsForLanes;
}

export const Grids: React.FC<Props> = ({
  grids,
  onClick,
  currentCargo,
  validPlacementIntervalsForLanes,
}) => {
  return (
    <>
      {grids.map((grid) => {
        return (
          <GridComponent
            grid={grid}
            onClick={onClick}
            key={grid.id}
            currentCargo={currentCargo}
            validPlacementIntervalsForLane={
              validPlacementIntervalsForLanes[grid.laneId]
            }
          />
        );
      })}
    </>
  );
};

export default Grids;
