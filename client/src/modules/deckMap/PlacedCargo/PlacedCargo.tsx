import * as React from "react";
import { Cargo } from "../../../shared/types/deckMap";
import { CargoIcon } from "../cargoIcon";
interface Props {
  cargo: Array<Cargo>;
}

export const PlacedCargo: React.FC<Props> = ({ cargo }) => {
  if (cargo.length === 0) return null;
  return (
    <>
      {cargo.map((c, ix) => {
        return (
          <g key={ix} id={`cargoIcon${c.id}`}>
            <CargoIcon x={c.LCG} y={c.TCG} width={c.length} height={c.width} />
          </g>
        );
      })}
    </>
  );
};

export default PlacedCargo;
