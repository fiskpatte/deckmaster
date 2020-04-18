import React from "react";
import GridComponent from "./Grid";
import { Grid, Cargo, Lane } from "../../../types/deckMap";
import { Placement } from "../../../types/util";

interface Props {
  grids: Array<Grid>;
  onClick: (placement: Placement) => void;
  nextPlacement: Placement;
  currentCargo: Cargo;
  isOverflow: boolean;
  lane: Lane;
}

export const Grids: React.FC<Props> = ({ grids, onClick, nextPlacement, isOverflow, currentCargo, lane }) => {
  return (
    <>
      {grids.map((grid, ix) => {
        return (
          <GridComponent
            grid={grid}
            onClick={onClick}
            key={ix}
            isOverflow={isOverflow}
            currentCargo={currentCargo}
            nextPlacement={nextPlacement}
            lane={lane}
          />
        );
      })}
    </>
  );
};

export default Grids;
