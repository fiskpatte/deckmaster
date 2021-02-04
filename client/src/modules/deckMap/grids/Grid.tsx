import React from "react";
import GridItem from "./GridItem";
import { DECK_MAP } from "../../../constants";
import { Grid, Cargo, ValidPlacementInterval } from "../../../types/deckMap";
import "./Grid.scss";
import { GridName } from "./GridName";
import {
  getValidPlacementIntervalForGridPlacement,
  isOverflowing,
} from "../DeckMap.functions";

interface Props {
  grid: Grid;
  onClick: (grid: Grid) => void;
  currentCargo: Cargo;
  validPlacementIntervalsForLane: ValidPlacementInterval[];
}

const radius =
  DECK_MAP.GRID_RADIUS * Math.max(DECK_MAP.X_SCALE, DECK_MAP.Y_SCALE);

const boundingBoxRadius = radius * 8;

const GridComponent: React.FC<Props> = ({
  grid,
  onClick,
  currentCargo,
  validPlacementIntervalsForLane,
}) => {
  if (
    !getValidPlacementIntervalForGridPlacement(
      validPlacementIntervalsForLane,
      grid,
      currentCargo,
      isOverflowing(currentCargo, grid)
    )
  )
    return null;

  return (
    <g
      onClick={(ev) => {
        ev.stopPropagation();
        onClick(grid);
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
