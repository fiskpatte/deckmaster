import React from "react";
import { CargoPlacement, Lane } from "./../../../types/deckMap";
import {
  getPlacementFromDragEvent,
  isValidPlacement,
} from "../DeckMap.functions";
import { CargoIcon } from "../cargoIcon";

interface Props {
  currentCargoPlacement: CargoPlacement;
  setCurrentCargoPlacement: (cargo: CargoPlacement) => void;
  placingLane: Lane;
  cargoPlacementsForLane: Array<CargoPlacement>;
  adjacentCargoPlacementsForLane: Array<CargoPlacement>;
  svgRef: React.RefObject<SVGSVGElement>;
  bumperToBumperDistance: number;
}

export const PlacingCargo: React.FC<Props> = ({
  currentCargoPlacement,
  setCurrentCargoPlacement,
  placingLane,
  cargoPlacementsForLane,
  adjacentCargoPlacementsForLane,
  svgRef,
  bumperToBumperDistance,
}) => {
  if (
    !currentCargoPlacement.laneId ||
    !placingLane?.id ||
    !cargoPlacementsForLane ||
    !adjacentCargoPlacementsForLane ||
    currentCargoPlacement.replacing
  )
    return null;

  const onCargoDrag = (event: MouseEvent | TouchEvent | PointerEvent) => {
    let newPlacement = getPlacementFromDragEvent(
      event,
      svgRef,
      cargoPlacementsForLane,
      adjacentCargoPlacementsForLane,
      placingLane,
      currentCargoPlacement,
      bumperToBumperDistance
    );
    if (isValidPlacement(newPlacement)) setCurrentCargoPlacement(newPlacement);
  };
  const pinCargoAfterDrag = () => {
    if (!isValidPlacement(currentCargoPlacement)) return;

    if (currentCargoPlacement.cargo.width > placingLane.width) {
      let pinnedPlacement = { ...currentCargoPlacement };
      pinnedPlacement.TCG =
        placingLane.TCG +
        ((currentCargoPlacement.TCG > placingLane.TCG ? 1 : -1) *
          (currentCargoPlacement.cargo.width - placingLane.width)) /
          2;
      setCurrentCargoPlacement(pinnedPlacement);
    }
  };

  return (
    <CargoIcon
      x={currentCargoPlacement.LCG}
      y={currentCargoPlacement.TCG}
      width={currentCargoPlacement.cargo.length}
      height={currentCargoPlacement.cargo.width}
      placing={true}
      dragCallback={onCargoDrag}
      dragEndCallback={pinCargoAfterDrag}
      cargoId={currentCargoPlacement.cargo.id}
      registrationNumber={currentCargoPlacement.cargo.registrationNumber}
    />
  );
};

export default PlacingCargo;
