import React, { useRef, useCallback } from "react";
import { DECK_MAP } from "../../constants";
import { Lanes } from "./lanes";
import {
  getViewBoxOriginX,
  getViewBoxOriginY,
  getViewBoxSizeX,
  getViewBoxSizeY,
  placeCargoFromSVGCoords,
  getRulerOrigin,
  placeCargoFromEvent,
} from "./DeckMap.functions";
import { CargoIcon } from "./cargoIcon";
import { Placement } from "../../types/util";
import { useDispatch } from "react-redux";
import { setCurrentPlacement } from "../../store/cargo/cargoActions";
import { Deck, Cargo } from "../../types/deckMap";
import "./DeckMap.scss";
import { useHistory } from "react-router-dom";
import { FrameRuler } from "./frameRuler";

interface Props {
  currentDeck: Deck;
  currentCargo: Cargo;
  currentPlacement: Placement | null;
}

const DeckMap: React.FC<Props> = ({
  currentDeck,
  currentCargo,
  currentPlacement,
}) => {
  const dispatch = useDispatch();
  const setPlacement = useCallback(
    (placement: Placement) => dispatch(setCurrentPlacement(placement)),
    [dispatch]
  );
  const svgRef = useRef<SVGSVGElement>(null);
  const history = useHistory();

  if (currentCargo.registrationNumber === "") {
    history.push("/placecargo");
  }

  const placeCargoFromClick = (event: React.MouseEvent | React.TouchEvent) => {
    console.log("lane clicked", event);
    return;
    // placeCargoFromEvent(event, svgRef, currentCargo, setPlacement);
  };

  const placeCargoFromDrag = (
    event: MouseEvent | TouchEvent | PointerEvent
  ) => {
    let placingLane = currentDeck.lanes.find(
      (l) => l.id === currentPlacement?.laneId
    );
    if (currentPlacement && placingLane) {
      placeCargoFromEvent(
        event,
        svgRef,
        placingLane,
        currentCargo,
        currentPlacement,
        setPlacement
      );
    }
  };

  const placeCargoFromFrontPlacement = (placement: Placement) => {
    placement.LCG -= currentCargo.length / 2;
    placeCargoFromSVGCoords(placement, setPlacement);
  };

  let viewBoxSizeX = getViewBoxSizeX(currentDeck);
  let viewBoxSizeY = getViewBoxSizeY(currentDeck);
  let viewBoxOriginX = getViewBoxOriginX(currentDeck);
  let viewBoxOriginY = getViewBoxOriginY(currentDeck);

  return (
    <svg
      className="svgBody"
      viewBox={`${viewBoxOriginX} ${viewBoxOriginY} ${viewBoxSizeX} ${viewBoxSizeY}`}
      preserveAspectRatio="xMidYMin"
      ref={svgRef}
    >
      <g
        className="containerGroup"
        transform={`scale(${DECK_MAP.X_SCALE} ${DECK_MAP.Y_SCALE})`}
      >
        <Lanes
          lanes={currentDeck.lanes}
          svgRef={svgRef}
          rightOrigin={viewBoxSizeX + viewBoxOriginX}
          currentCargo={currentCargo}
          onClick={(ev) => placeCargoFromClick(ev)}
          onButtonClick={(placement) => placeCargoFromFrontPlacement(placement)}
        />
        <FrameRuler
          frames={currentDeck.frames}
          originY={getRulerOrigin(currentDeck)}
        />
        {/* This makes sure that the cargo is always visible over lanes */}
        {currentDeck.lanes.map((lane, ix) =>
          lane.cargo.map((c, ixc) => {
            return <use key={100 * ix + ixc} href={`#cargoIcon${c.id}`} />;
          })
        )}
        {!!currentPlacement && (
          <CargoIcon
            x={currentPlacement.LCG}
            y={currentPlacement.TCG}
            width={currentCargo.length}
            height={currentCargo.width}
            placing={true}
            dragCallback={placeCargoFromDrag}
          />
        )}
      </g>
    </svg>
  );
};

export default DeckMap;
