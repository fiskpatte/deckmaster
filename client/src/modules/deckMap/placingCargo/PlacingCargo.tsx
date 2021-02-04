import React from "react";
import {
  CargoPlacement,
  cargoPlacementAsDeckMapElement,
  Lane,
  ValidPlacementInterval,
} from "./../../../types/deckMap";
import {
  getOverflowingLaneId,
  getOverflowingSide,
  getPlacementFromDragEvent,
  isValidPlacement,
} from "../DeckMap.functions";
import { CargoIcon } from "../cargoIcon";

interface Props {
  currentCargoPlacement: CargoPlacement;
  setCurrentCargoPlacement: (cargo: CargoPlacement) => void;
  placingLane: Lane;
  validPlacementIntervalsForLane: ValidPlacementInterval[];
  svgRef: React.RefObject<SVGSVGElement>;
}

export const PlacingCargo: React.FC<Props> = ({
  currentCargoPlacement,
  setCurrentCargoPlacement,
  placingLane,
  validPlacementIntervalsForLane,
  svgRef,
}) => {
  if (
    !currentCargoPlacement.laneId ||
    !placingLane?.id ||
    !validPlacementIntervalsForLane ||
    currentCargoPlacement.replacing
  )
    return null;

  const onCargoDrag = (event: MouseEvent | TouchEvent | PointerEvent) => {
    let newPlacement = getPlacementFromDragEvent(
      event,
      svgRef,
      validPlacementIntervalsForLane,
      placingLane,
      currentCargoPlacement
    );
    if (isValidPlacement(newPlacement)) setCurrentCargoPlacement(newPlacement);
  };
  const pinCargoAfterDrag = () => {
    if (!isValidPlacement(currentCargoPlacement)) return;

    if (currentCargoPlacement.cargo.width > placingLane.width) {
      let pinnedPlacement = { ...currentCargoPlacement };
      let overflowingSide = getOverflowingSide(
        placingLane,
        currentCargoPlacement
      );
      pinnedPlacement.overflowingLaneId = getOverflowingLaneId(
        placingLane,
        cargoPlacementAsDeckMapElement(currentCargoPlacement),
        overflowingSide
      );
      pinnedPlacement.TCG =
        placingLane.TCG +
        (overflowingSide *
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
