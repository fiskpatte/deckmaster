import * as React from "react";
import { CargoPlacement } from "../../../types/deckMap";
import { CargoIcon } from "../cargoIcon";
interface Props {
  cargo: Array<CargoPlacement>;
  onCargoPlacementClick: (cp: CargoPlacement) => void;
}

export const PlacedCargo: React.FC<Props> = ({
  cargo: cargoPlacements,
  onCargoPlacementClick
}) => {
  if (cargoPlacements.length === 0) return null;

  return (
    <>
      {cargoPlacements.map(cp => (
        <g
          key={`cargoIcon${cp.id}`}
          onClick={() => onCargoPlacementClick(cp)}
        >
          <CargoIcon
            x={cp.LCG}
            y={cp.TCG}
            width={cp.cargo.length}
            height={cp.cargo.width}
            cargoId={cp.cargo.id}
          />
        </g>
      ))}
    </>
  );
};

export default PlacedCargo;
