import React from "react";
import GridItem from "./GridItem";
import { DECK_MAP } from "../../../constants";
import { Grid, Cargo, Lane } from "../../../types/deckMap";
import { Placement } from "../../../types/util";
import "./Grid.scss";
import { GridName } from "./GridName";
import { handleOverflow } from "../DeckMap.functions";

interface Props {
  grid: Grid;
  onClick: (placement: Placement) => void;
  isOverflow: boolean;
  currentCargo: Cargo;
  nextPlacement: Placement;
  lane: Lane;
}

const radius =
  DECK_MAP.GRID_RADIUS * Math.max(DECK_MAP.X_SCALE, DECK_MAP.Y_SCALE);

const boundingBoxRadius = radius * 8;

const GridComponent: React.FC<Props> = ({
  grid,
  onClick,
  isOverflow,
  currentCargo,
  nextPlacement,
  lane,
  ...rest
}) => {
  let gridPlacement = {
    LCG: grid.LCG + grid.length / 2,
    TCG: grid.TCG,
    laneId: nextPlacement.laneId,
  } as Placement;
  let isVisible =
    grid.LCG + grid.length / 2 <= nextPlacement.LCG &&
    (!isOverflow || handleOverflow(currentCargo, gridPlacement, lane, false));

  if (!isVisible) return null;

  return (
    <g
      onClick={(ev) => {
        ev.stopPropagation();
        onClick(gridPlacement);
      }}
    >
      <GridItem {...rest} grid={grid} radius={radius} upper />
      <GridItem {...rest} grid={grid} radius={radius} />
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
