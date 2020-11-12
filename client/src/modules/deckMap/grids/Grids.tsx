import React from "react";
import GridComponent from "./Grid";
import {
  Grid,
  Cargo,
  Lane,
  CargoPlacement,
  laneFactory,
  CargoPlacementsForLanes,
} from "../../../types/deckMap";

interface Props {
  grids: Array<Grid>;
  setPlacementFromForward: (placement: CargoPlacement) => void;
  currentCargo: Cargo;
  cargoPlacementsForLanes: CargoPlacementsForLanes;
  adjacentCargoPlacementsForLanes: CargoPlacementsForLanes;
  lanes: Array<Lane>;
}

export const Grids: React.FC<Props> = ({
  grids,
  setPlacementFromForward,
  currentCargo,
  cargoPlacementsForLanes,
  adjacentCargoPlacementsForLanes,
  lanes,
}) => {
  return (
    <>
      {grids.map((grid) => {
        let lane = lanes.find((l) => l.id === grid.laneId) ?? laneFactory();
        if (lane.id === "") {
          console.log(`FATAL ERROR: Can't find lane for grid ${grid}`);
          return null;
        }
        return (
          <GridComponent
            grid={grid}
            setPlacementFromForward={setPlacementFromForward}
            key={grid.id}
            currentCargo={currentCargo}
            lane={lane}
            cargoPlacementsForLane={cargoPlacementsForLanes[lane.id]}
            adjacentCargoPlacementsForLane={
              adjacentCargoPlacementsForLanes[lane.id]
            }
          />
        );
      })}
    </>
  );
};

export default Grids;
