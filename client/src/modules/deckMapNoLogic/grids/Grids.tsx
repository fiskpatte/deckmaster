import React from "react";
import GridComponent from "./Grid";
import { Grid } from "../../../types/deckMap";

interface Props {
  grids: Array<Grid>;
}

export const Grids: React.FC<Props> = ({ grids }) => {
  return (
    <>
      {grids.map((grid) => {
        return (
          <GridComponent
            grid={grid}
            key={grid.id}
          />
        );
      })}
    </>
  );
};

export default Grids;
