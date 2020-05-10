import * as React from "react";
import { CargoPlacement } from "../../../types/deckMap";
import { CargoIcon } from "../cargoIcon";
interface Props {
  cargo: Array<CargoPlacement>;
}

export const PlacedCargo: React.FC<Props> = ({ cargo: cargoPlacements }) => {
  if (cargoPlacements.length === 0) return null;
  return (
    <>
      {cargoPlacements.map((cp) => {
        return (
          <defs key={cp.id}>
            <g id={`cargoIcon${cp.id}`}>
              <CargoIcon
                x={cp.LCG}
                y={cp.TCG}
                width={cp.cargo.length}
                height={cp.cargo.width}
              />
            </g>
          </defs>
        );
      })}
    </>
  );
};

export default PlacedCargo;
