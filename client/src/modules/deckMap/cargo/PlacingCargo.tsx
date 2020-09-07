import * as React from 'react';
import { Placement } from '../../../types/util';
import { Cargo } from "../../../types/deckMap";
import { CargoIcon } from '../cargoIcon';

interface Props {
  cargo: Cargo;
  placement: Placement;
}
export const PlacingCargo: React.FC<Props> = ({ cargo, placement }) => {
  if (cargo.id === "" || placement.laneId === "") return null;
  return (
    <CargoIcon
      x={placement.LCG}
      y={placement.TCG}
      width={cargo.length}
      height={cargo.width}
      placing={true}
      cargoId={cargo.id}
    />
  );
}