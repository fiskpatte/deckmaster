import React from "react";
import GridComponent from "./Grid";
import { Grid } from "../../../types/deckMap";
import { Coords } from "../../../types/util";

interface Props {
  grids: Array<Grid>;
  onClick: (position: Coords) => void;
  nextPosition: Coords;
}

export const Grids: React.FC<Props> = ({ grids, onClick, nextPosition }) => {
  return (
    <>
      {grids.map((grid, ix) => {
        return (
          <GridComponent
            grid={grid}
            visible={grid.LCG + grid.length / 2 <= nextPosition.x}
            onClick={onClick}
            key={ix}
          />
        );
      })}
    </>
  );
};

export default Grids;
