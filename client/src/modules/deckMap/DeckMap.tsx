import React, { useRef, useEffect, useState } from "react";
import { DECK_MAP } from "../../constants";
import { Lanes } from "./lanes";
import {
  getViewBoxOriginX,
  getViewBoxOriginY,
  getViewBoxSizeX,
  getViewBoxSizeY,
  getRulerOrigin,
} from "./DeckMap.functions";
import { Deck, Cargo } from "../../types/deckMap";
import "./DeckMap.scss";
import { FrameRuler } from "./frameRuler";
import { Loader } from "../../components/loader/Loader";
import { PlacedCargoUse } from "./cargo";
import { Placement } from "../../types/util";
import { PlacingCargo } from "./cargo/PlacingCargo";

interface Props {
  deck: Deck;
  currentCargo: Cargo;
  currentPlacement: Placement;
  isEditable: boolean;
}
interface ViewBoxDimensions {
  sizeX: number;
  sizeY: number;
  originX: number;
  originY: number;
}
const DeckMap: React.FC<Props> = ({ deck, currentCargo, currentPlacement, isEditable }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBoxDimensions, setViewBoxDimensions] = useState<
    ViewBoxDimensions
  >();
  useEffect(() => {
    setViewBoxDimensions({
      sizeX: getViewBoxSizeX(deck),
      sizeY: getViewBoxSizeY(deck),
      originX: getViewBoxOriginX(deck),
      originY: getViewBoxOriginY(deck),
    });
  }, [deck]);

  if (deck.lanes.length === 0) return null;
  if (!viewBoxDimensions) return <Loader />;
  console.log("currentCargo", currentCargo)
  const { sizeX, sizeY, originX, originY } = viewBoxDimensions;

  return (
    <svg
      className="svgBody"
      viewBox={`${originX} ${originY} ${sizeX} ${sizeY}`}
      preserveAspectRatio="xMidYMin"
      ref={svgRef}
    >
      <g
        className="containerGroup"
        transform={`scale(${DECK_MAP.X_SCALE} ${DECK_MAP.Y_SCALE})`}
      >
        <Lanes
          lanes={deck.lanes}
          rightOrigin={sizeX + originX}
        />
        <FrameRuler frames={deck.frames} originY={getRulerOrigin(deck)} />
        <PlacedCargoUse lanes={deck.lanes} isEditable={isEditable} />
        <PlacingCargo cargo={currentCargo} placement={currentPlacement} />
      </g>
    </svg>
  );
};

export default DeckMap;
