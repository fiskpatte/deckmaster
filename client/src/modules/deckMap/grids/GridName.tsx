import React from "react";
import { Grid } from "../../../types/deckMap";
import { DECK_MAP } from "../../../constants";

interface Props {
  grid: Grid;
}

export const GridName: React.FC<Props> = ({ grid }) => {

  return (
    <text
      className="GridName"
      transform={`scale(${1 / DECK_MAP.X_SCALE} ${1 / DECK_MAP.Y_SCALE})`}
      fontSize={`${DECK_MAP.GRID_NAME_FONT_SIZE}em`}
      x={grid.LCG * DECK_MAP.X_SCALE}
      y={grid.TCG * DECK_MAP.Y_SCALE}
    >
      {grid.name.substr(-2)}
    </text>
  );
};

export default GridName;
