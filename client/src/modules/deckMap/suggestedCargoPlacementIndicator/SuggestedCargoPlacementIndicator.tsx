import React from "react";
import { Cargo, SuggestedCargoPlacement } from "../../../types/deckMap";
import "./SuggestedCargoPlacementIndicator.scss";

interface Props {
  suggestedCargoPlacement?: SuggestedCargoPlacement;
  cargo: Cargo;
}

export const SuggestedCargoPlacementIndicator: React.FC<Props> = ({
  suggestedCargoPlacement,
  cargo,
}) => {
  if (!suggestedCargoPlacement) return null;

  const { width, length } = cargo;
  const { LCG, TCG } = suggestedCargoPlacement;
  const corner = { x: LCG - length / 2, y: TCG - width / 2 };

  return (
    <rect
      x={corner.x}
      y={corner.y}
      width={length}
      height={width}
      className="SuggestedCargoPlacementIndicator"
    />
  );
};
