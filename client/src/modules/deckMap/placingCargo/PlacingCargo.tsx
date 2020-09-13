import React, { useState, useEffect } from "react";
import { CargoPlacement, Lane, laneFactory } from './../../../types/deckMap';
import { getPlacementFromEvent } from "../DeckMap.functions";
import { CargoIcon } from "../cargoIcon";

interface Props {
  currentCargoPlacement: CargoPlacement;
  setCurrentCargoPlacement: (cargo: CargoPlacement) => void;
  lanes: Array<Lane>;
  cargoPlacements: Array<CargoPlacement>;
  svgRef: React.RefObject<SVGSVGElement>;
  bumperToBumperDistance: number;
}

export const PlacingCargo: React.FC<Props> = ({
  currentCargoPlacement,
  setCurrentCargoPlacement,
  lanes,
  cargoPlacements,
  svgRef,
  bumperToBumperDistance
}) => {

  const [placingLane, setPlacingLane] = useState<Lane>();
  const [cargoPlacementsForLane, setCargoPlacementsForLane] = useState<CargoPlacement[]>();
  const [cargoPlacementsOverflowingIntoLane, setCargoPlacementsOverflowingIntoLane] = useState<CargoPlacement[]>();

  useEffect(() => {
    setPlacingLane(lanes.find((l) => l.id === currentCargoPlacement.laneId) ?? laneFactory());
  }, [lanes, currentCargoPlacement])

  useEffect(() => {
    if (!placingLane?.id) return;
    setCargoPlacementsForLane(cargoPlacements.filter(cp => cp.laneId === placingLane.id && cp.cargo.id !== currentCargoPlacement.cargo.id) ?? []);
    setCargoPlacementsOverflowingIntoLane(cargoPlacements.filter((cp) => cp.overflowingLaneId === placingLane.id && cp.cargo.id !== currentCargoPlacement.cargo.id) ?? []);
  }, [placingLane, cargoPlacements, currentCargoPlacement.cargo.id])

  if (!placingLane?.id || !cargoPlacementsForLane || !cargoPlacementsOverflowingIntoLane) return null;

  const onCargoDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
  ) => {
    let newPlacement = getPlacementFromEvent(
      event,
      svgRef,
      cargoPlacementsForLane,
      cargoPlacementsOverflowingIntoLane,
      placingLane,
      currentCargoPlacement,
      bumperToBumperDistance
    );
    if (newPlacement.laneId !== "") setCurrentCargoPlacement(newPlacement);
  };
  const pinCargoAfterDrag = () => {

    if (currentCargoPlacement.laneId === "") return;

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
    />
  );
};

export default PlacingCargo;
