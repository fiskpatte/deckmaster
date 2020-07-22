import * as React from "react";
import { CargoPlacement, Lane } from "../../../types/deckMap";
import { CargoIcon } from "../cargoIcon";

interface DefProps {
  cargoPlacements: Array<CargoPlacement>;
}
interface UseProps {
  lanes: Array<Lane>;
  isEditable: boolean;
}

export const PlacedCargoDefs: React.FC<DefProps> = ({ cargoPlacements }) => {
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
                cargoId={cp.cargo.id}
              />
            </g>
          </defs>
        );
      })}
    </>
  );
};

export const PlacedCargoUse: React.FC<UseProps> = ({ lanes, isEditable }) => {
  return (
    <>
      {lanes.map((lane) =>
        lane.cargo.map(
          (c) =>
            <use
              key={lane.id + c.id}
              href={`#cargoIcon${c.id}`}
              onClick={() => isEditable && console.log("clicked placed cargo", c.id)}
            />
        )
      )}
    </>
  )
}
