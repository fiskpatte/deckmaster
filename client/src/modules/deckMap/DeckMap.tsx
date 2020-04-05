import React, { useRef } from "react";
import { DECK_MAP, OverflowDirection } from "../../shared/constants";
import { Lanes } from "./lanes";
import {
  getViewBoxOriginX,
  getViewBoxOriginY,
  getViewBoxSizeX,
  getViewBoxSizeY,
  placeCargoFromSVGCoords,
  getRulerOrigin
} from "./DeckMap.functions";
import { CargoIcon } from "./cargoIcon";
import { Coords, Placement } from "../../shared/types/util";
import { useDispatch } from "react-redux";
import { setCurrentPlacement } from "../../store/actions/cargoActions";
import { Deck, Cargo } from "../../shared/types/deckMap";
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
  const setPlacement = (placement: Placement) =>
    dispatch(setCurrentPlacement(placement));
  const svgRef = useRef<SVGSVGElement>(null);
  const history = useHistory();

  if (currentCargo.registrationNumber === "") {
    history.push("/placecargo");
  }
  currentCargo.width = 4;
  const placeCargoFromClick = (event: React.MouseEvent | React.TouchEvent) => {
    console.log("lane clicked", event);
    return;
    // placeCargoFromEvent(event, svgRef, currentCargo, setPlacement);
  };
  const placeCargoFromFrontPosition = (position: Coords, laneID: number) => {
    position.x -= currentCargo.length / 2;
    let placingLane = currentDeck.lanes.find((l) => l.id === laneID);
    let TCG = position.y;
    let overflow = OverflowDirection.None;
    if (placingLane && currentCargo.width > placingLane.width) {
      TCG += (currentCargo.width - placingLane.width) / 2;
      overflow = OverflowDirection.Right;
    }
    let newPlacement = {
      LCG: position.x,
      TCG: TCG,
      laneID: laneID,
      overflowDirection: overflow,
    } as Placement;
    placeCargoFromSVGCoords(newPlacement, setPlacement);
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
          onClick={(ev) => placeCargoFromClick(ev)}
          onButtonClick={(position, id) =>
            placeCargoFromFrontPosition(position, id)
          }
        />
        <FrameRuler frames={currentDeck.frames} originY={getRulerOrigin(currentDeck)} />
        {/* This makes sure that the cargo is always visible over lanes */}
        {currentDeck.lanes.map((lane, ix) =>
          lane.cargo.map((c, ixc) => {
            return <use key={100 * ix + ixc} href={`#cargoIcon${c.id}`} />;
          })
        )}
        {currentPlacement ? (
          <CargoIcon
            x={currentPlacement.LCG}
            y={currentPlacement.TCG}
            width={currentCargo.length}
            height={currentCargo.width}
            placing={true}
          />
        ) : null}
      </g>
    </svg>
  );
};

export default DeckMap;
