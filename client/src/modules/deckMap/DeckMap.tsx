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
  getPlacementFromValidIntervalsForLanePlacement,
  getPlacementFromValidIntervalsForGridPlacement,
} from "./DeckMap.functions";
import { useDispatch } from "react-redux";
import { setCurrentPlacement } from "../../store/deckMap/deckMapActions";
import {
  Deck,
  CargoPlacement,
  ViewBoxDimensions,
  Lane,
  SuggestedCargoPlacement,
  ValidPlacementIntervalsForLanes,
  Grid,
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
  viewBoxDimensions: ViewBoxDimensions | undefined;
  validPlacementIntervalsForLanes: ValidPlacementIntervalsForLanes;
  replacingCargoPlacements: CargoPlacement[];
  notReplacingCargoPlacements: CargoPlacement[];
  replaceButtonClick: () => Promise<void>;
  placingLane: Lane;
  suggestedCargoPlacement?: SuggestedCargoPlacement;
  defaultVCG: number;
}

const DeckMap: React.FC<Props> = ({
  deck,
  currentCargoPlacement,
  isOverview = false,
  setInitialCargoPlacement,
  viewBoxDimensions,
  validPlacementIntervalsForLanes,
  replacingCargoPlacements,
  notReplacingCargoPlacements,
  replaceButtonClick,
  placingLane,
  suggestedCargoPlacement,
  defaultVCG,
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
    lane: Lane
  ) => {
    if (cargoIsEmpty(currentCargoPlacement.cargo)) return;
    const newPlacement = getPlacementFromEvent(
      event,
      svgRef,
      validPlacementIntervalsForLanes[lane.id],
      lane,
      currentCargoPlacement.cargo,
      defaultVCG
    );
    if (!isValidPlacement(newPlacement)) return;
    setPlacement({
      ...currentCargoPlacement,
      ...newPlacement,
      deckId: deck.name,
    });
  };

  const onGridClick = (grid: Grid) =>
    setPlacementFromForward(
      getPlacementFromValidIntervalsForGridPlacement(
        validPlacementIntervalsForLanes[grid.laneId],
        currentCargoPlacement.cargo,
        grid,
        deck.lanes.find((l) => l.id === grid.laneId),
        defaultVCG
      )
    );

  const onLaneButtonClick = (lane: Lane) => {
    setPlacementFromForward(
      getPlacementFromValidIntervalsForLanePlacement(
        validPlacementIntervalsForLanes[lane.id],
        currentCargoPlacement.cargo,
        lane,
        defaultVCG
      )
    );
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
          validPlacementIntervalsForLanes={validPlacementIntervalsForLanes}
          onLaneClick={onLaneClick}
        />
        <Grids
          grids={deck.grids}
          onClick={onGridClick}
          currentCargo={currentCargoPlacement.cargo}
          validPlacementIntervalsForLanes={validPlacementIntervalsForLanes}
        />
        {deck.lanes.map((lane) => (
          <use
            key={lane.id}
            href={`#arrowButton_${lane.id}`}
            xlinkHref={`#arrowButton_${lane.id}`}
            onClick={() => onLaneButtonClick(lane)}
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
          validPlacementIntervalsForLane={
            validPlacementIntervalsForLanes[placingLane.id]
          }
          svgRef={svgRef}
          setCurrentCargoPlacement={setPlacement}
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
