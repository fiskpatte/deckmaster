import React, { useRef, useCallback } from "react";
import { DECK_MAP } from "../../constants";
import { Lanes } from "./lanes";
import {
  getDeckMapBottom,
  cargoIsEmpty,
  cargoPlacementIsEmpty,
  getReplacementBoxOrigin,
  getPlacementFromEvent,
  isValidPlacement,
} from "./DeckMap.functions";
import { useDispatch } from "react-redux";
import { setCurrentPlacement } from "../../store/deckMap/deckMapActions";
import {
  Deck,
  CargoPlacement,
  ViewBoxDimensions,
  MostForwardValidPlacementForLanes,
  CargoPlacementsForLanes,
  Lane,
  SuggestedCargoPlacement,
} from "../../types/deckMap";
import "./DeckMap.scss";
import FrameRuler from "./frameRuler";
import { PlacedCargo } from "./placedCargo";
import { Grids } from "./grids";
import { PlacingCargo } from "./placingCargo";
import { ReplacementBox } from "./replacementBox";
import { SuggestedCargoPlacementIndicator } from "./suggestedCargoPlacementIndicator";

interface Props {
  deck: Deck;
  currentCargoPlacement: CargoPlacement;
  isOverview: boolean;
  setInitialCargoPlacement: (d: CargoPlacement) => void;
  bumperToBumperDistance: number;
  viewBoxDimensions: ViewBoxDimensions | undefined;
  mostForwardValidPlacementForLanes: MostForwardValidPlacementForLanes;
  cargoPlacementsForLanes: CargoPlacementsForLanes;
  adjacentCargoPlacementsForLanes: CargoPlacementsForLanes;
  replacingCargoPlacements: CargoPlacement[];
  notReplacingCargoPlacements: CargoPlacement[];
  replaceButtonClick: () => Promise<void>;
  placingLane: Lane;
  suggestedCargoPlacement?: SuggestedCargoPlacement;
}

const DeckMap: React.FC<Props> = ({
  deck,
  currentCargoPlacement,
  isOverview = false,
  setInitialCargoPlacement,
  bumperToBumperDistance,
  viewBoxDimensions,
  mostForwardValidPlacementForLanes,
  cargoPlacementsForLanes,
  adjacentCargoPlacementsForLanes,
  replacingCargoPlacements,
  notReplacingCargoPlacements,
  replaceButtonClick,
  placingLane,
  suggestedCargoPlacement,
}) => {
  const dispatch = useDispatch();
  const setPlacement = useCallback(
    (placement: CargoPlacement) => dispatch(setCurrentPlacement(placement)),
    [dispatch]
  );

  const svgRef = useRef<SVGSVGElement>(null);

  const onCargoPlacementClick = (cargoPlacement: CargoPlacement) => {
    if (!isOverview) return;
    if (currentCargoPlacement.cargo.id !== cargoPlacement.cargo.id) {
      setInitialCargoPlacement({ ...cargoPlacement });
    }
    setPlacement({ ...cargoPlacement, deckId: deck.name });
  };

  const setPlacementFromForward = (placement: CargoPlacement) => {
    if (
      cargoIsEmpty(currentCargoPlacement.cargo) ||
      cargoPlacementIsEmpty(placement)
    )
      return;
    placement.LCG -= currentCargoPlacement.cargo.length / 2;
    setPlacement({ ...currentCargoPlacement, ...placement, deckId: deck.name });
  };

  const onLaneClick = (
    event: React.MouseEvent | React.TouchEvent | React.PointerEvent,
    lane: Lane,
    VCG: number
  ) => {
    if (cargoIsEmpty(currentCargoPlacement.cargo)) return;
    const newPlacement = getPlacementFromEvent(
      event,
      svgRef,
      cargoPlacementsForLanes[lane.id],
      adjacentCargoPlacementsForLanes[lane.id],
      lane,
      currentCargoPlacement
      // bumperToBumperDistance
    );
    if (!isValidPlacement(newPlacement)) return;
    setPlacement({
      ...newPlacement,
      deckId: deck.name,
      VCG: VCG,
    });
  };

  if (!viewBoxDimensions) return null;

  const { sizeX, sizeY, originX, originY } = viewBoxDimensions;

  if (
    !(
      isFinite(sizeX) &&
      isFinite(sizeY) &&
      isFinite(originY) &&
      isFinite(originX)
    )
  )
    return null;

  return (
    <svg
      className="svgBody"
      viewBox={`${originX} ${originY} ${sizeX} ${sizeY}`}
      preserveAspectRatio="xMidYMid"
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      version="2.0"
    >
      <g
        className="containerGroup"
        transform={`scale(${DECK_MAP.X_SCALE} ${DECK_MAP.Y_SCALE})`}
      >
        <Lanes
          lanes={deck.lanes}
          rightOrigin={sizeX + originX}
          currentCargo={currentCargoPlacement.cargo}
          mostForwardValidPlacementForLanes={mostForwardValidPlacementForLanes}
          onLaneClick={onLaneClick}
        />
        <Grids
          grids={deck.grids}
          setPlacementFromForward={setPlacementFromForward}
          currentCargo={currentCargoPlacement.cargo}
          cargoPlacementsForLanes={cargoPlacementsForLanes}
          adjacentCargoPlacementsForLanes={adjacentCargoPlacementsForLanes}
          lanes={deck.lanes}
        />
        {deck.lanes.map((lane) => (
          <use
            key={lane.id}
            href={`#arrowButton_${lane.id}`}
            xlinkHref={`#arrowButton_${lane.id}`}
            onClick={(ev) => {
              ev.preventDefault();
              setPlacementFromForward(
                mostForwardValidPlacementForLanes[lane.id]
              );
            }}
          />
        ))}
        <FrameRuler frames={deck.frames} originY={getDeckMapBottom(deck)} />
        {isOverview && (
          <ReplacementBox
            cargoPlacements={replacingCargoPlacements}
            currentCargoPlacement={currentCargoPlacement}
            originY={getReplacementBoxOrigin(deck)}
            originX={originX}
            sizeX={sizeX}
            onCargoPlacementClick={(cp: CargoPlacement) =>
              onCargoPlacementClick(cp)
            }
            replaceButtonClick={replaceButtonClick}
          />
        )}
        <PlacedCargo
          cargo={notReplacingCargoPlacements}
          onCargoPlacementClick={(cp: CargoPlacement) =>
            onCargoPlacementClick(cp)
          }
        />
        <PlacingCargo
          currentCargoPlacement={currentCargoPlacement}
          placingLane={placingLane}
          cargoPlacementsForLane={cargoPlacementsForLanes[placingLane.id]}
          adjacentCargoPlacementsForLane={
            adjacentCargoPlacementsForLanes[placingLane.id]
          }
          svgRef={svgRef}
          setCurrentCargoPlacement={setPlacement}
          bumperToBumperDistance={bumperToBumperDistance}
        />
        <SuggestedCargoPlacementIndicator
          currentDeckId={deck.name}
          suggestedCargoPlacement={suggestedCargoPlacement}
          cargo={currentCargoPlacement.cargo}
        />
      </g>
    </svg>
  );
};

export default DeckMap;
