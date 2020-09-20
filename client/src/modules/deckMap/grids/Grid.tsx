import React from "react";
import GridItem from "./GridItem";
import { DECK_MAP } from "../../../constants";
import { Grid, Cargo, Lane } from "../../../types/deckMap";
import "./Grid.scss";
import { GridName } from "./GridName";
import { getOverflowingPlacement } from "../DeckMap.functions";
import { CargoPlacement } from './../../../types/deckMap';

interface Props {
  grid: Grid;
  onClick: (placement: CargoPlacement) => void;
  isOverflow: boolean;
  currentCargo: Cargo;
  adjacentCargoPlacementsForLane: CargoPlacement[];
  lane: Lane;
  mostForwardValidPlacementForLane: CargoPlacement;
}

const radius =
  DECK_MAP.GRID_RADIUS * Math.max(DECK_MAP.X_SCALE, DECK_MAP.Y_SCALE);

const boundingBoxRadius = radius * 8;

const GridComponent: React.FC<Props> = ({
  grid,
  onClick,
  isOverflow,
  currentCargo,
  adjacentCargoPlacementsForLane,
  lane,
  mostForwardValidPlacementForLane
}) => {
  let gridPlacement = {
    LCG: grid.LCG + grid.length / 2,
    TCG: grid.TCG,
    laneId: lane.id,
    replacing: false
  } as CargoPlacement;
  let isVisible = grid.LCG + grid.length / 2 <= mostForwardValidPlacementForLane.LCG;

  if (isOverflow) {
    const overflowingPlacement = getOverflowingPlacement(
      lane,
      currentCargo,
      gridPlacement,
      adjacentCargoPlacementsForLane,
      false
    );
    if (overflowingPlacement.laneId === "") return null;
    gridPlacement = overflowingPlacement;
  }

  if (!isVisible) return null;

  return (
    <g
      onClick={ev => {
        ev.stopPropagation();
        onClick(gridPlacement);
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
