import React from "react";
import GridItem from "./GridItem";
import { DECK_MAP } from "../../../constants";
import { Grid, Cargo, Lane } from "../../../types/deckMap";
import "./Grid.scss";
import { GridName } from "./GridName";
import {
  getPlacementFromForwardPlacement,
  isValidPlacement,
} from "../DeckMap.functions";
import { CargoPlacement } from "./../../../types/deckMap";
import { getVCGForCargoAndLane } from "../../../store/app/appSelectors";
import { useSelector } from "react-redux";

interface Props {
  grid: Grid;
  setPlacementFromForward: (placement: CargoPlacement) => void;
  currentCargo: Cargo;
  cargoPlacementsForLane: CargoPlacement[];
  adjacentCargoPlacementsForLane: CargoPlacement[];
  lane: Lane;
}

const radius =
  DECK_MAP.GRID_RADIUS * Math.max(DECK_MAP.X_SCALE, DECK_MAP.Y_SCALE);

const boundingBoxRadius = radius * 8;

const GridComponent: React.FC<Props> = ({
  grid,
  setPlacementFromForward,
  currentCargo,
  cargoPlacementsForLane,
  adjacentCargoPlacementsForLane,
  lane,
}) => {
  const VCGForCargoAndLane = useSelector(
    getVCGForCargoAndLane(currentCargo, lane)
  );
  const gridPlacementFromForward = {
    LCG: grid.LCG + grid.length / 2,
    TCG: grid.TCG,
    VCG: VCGForCargoAndLane,
    laneId: lane.id,
    replacing: false,
  } as CargoPlacement;

  const validPlacement = getPlacementFromForwardPlacement(
    lane,
    currentCargo,
    gridPlacementFromForward,
    cargoPlacementsForLane,
    adjacentCargoPlacementsForLane
  );

  if (!isValidPlacement(validPlacement)) return null;

  return (
    <g
      onClick={(ev) => {
        ev.stopPropagation();
        setPlacementFromForward(validPlacement);
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
