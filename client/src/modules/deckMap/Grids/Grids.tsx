import React from "react";
import GridComponent from "./Grid";
import { Grid } from "../../../shared/types/deckMap";
import { Coords } from "../../../shared/types/util";

interface Props {
  ids: Array<Grid>;
  Click: (position: Coords) => void;
  xtPosition: Coords;
}

export const Grids: React.FC<Props> = ({ grids, onClick, nextPosition }) => {
  return (
    <>
      {
        grids.map((grid, ix) => {
          return (
            <GridComponent grid={grid}
              visible={grid.LCG + grid.length / 2 < nextPosition.x}
              onClick={onClick}
              key={ix} />
          )
        })
      }
    </>
  )

}

export default Grids;
