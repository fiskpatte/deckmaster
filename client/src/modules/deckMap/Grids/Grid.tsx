import React from "react";
import GridItem from "./GridItem";
import { DECK_MAP } from "../../../constants";
import { Grid } from "../../../types/deckMap";
import "./Grid.scss";
import { GridName } from "./GridName";

interface Props {
  grid: Grid;
}

const radius =
  DECK_MAP.GRID_RADIUS * Math.max(DECK_MAP.X_SCALE, DECK_MAP.Y_SCALE);

const boundingBoxRadius = radius * 8;

const GridComponent: React.FC<Props> = ({
  grid,
}) => {
  return (
    <g
      onClick={(ev) => {
        ev.stopPropagation();
      }}
    >
      <GridItem grid={grid} radius={radius} upper />
      <GridItem grid={grid} radius={radius} />
      <GridName grid={grid} />
      <rect
        className="BoundingBox"
        x={grid.LCG - grid.length / 2 + boundingBoxRadius / 2}
        y={grid.TCG - grid.width / 2}
        width={grid.length}
        height={grid.width}
      />
    </g>
  );
};

export default GridComponent;
