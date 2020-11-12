import React from "react";
import GridComponent from "./Grid";
import {
  Grid,
  Cargo,
  Lane,
  CargoPlacement,
  laneFactory,
} from "../../../types/deckMap";

interface Props {
  grids: Array<Grid>;
  setPlacementFromForward: (placement: CargoPlacement) => void;
  currentCargo: Cargo;
  cargoPlacements: CargoPlacement[];
  lanes: Array<Lane>;
}

export const Grids: React.FC<Props> = ({
  grids,
  setPlacementFromForward,
  currentCargo,
  cargoPlacements,
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
            cargoPlacementsForLane={cargoPlacements.filter(
              (cp) => cp.laneId === lane.id
            )}
            adjacentCargoPlacementsForLane={cargoPlacements.filter((cp) =>
              lane.adjacentLanes.some((al) => al.id === cp.laneId)
            )}
          />
        );
      })}
    </>
  );
};

export default Grids;
