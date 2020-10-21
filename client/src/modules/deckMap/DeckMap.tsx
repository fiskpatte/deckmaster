import React, { useRef, useCallback } from "react";
import { DECK_MAP } from "../../constants";
import { Lanes } from "./lanes";
import {
  getDeckMapBottom,
  cargoIsEmpty,
  cargoPlacementIsEmpty,
  getReplacementBoxOrigin,
} from "./DeckMap.functions";
import { useDispatch } from "react-redux";
import { setCurrentPlacement } from "../../store/deckMap/deckMapActions";
import {
  Deck,
  CargoPlacement,
  ViewBoxDimensions,
  MostForwardValidPlacementForLanes,
} from "../../types/deckMap";
import "./DeckMap.scss";
import FrameRuler from "./frameRuler";
import { PlacedCargo } from "./placedCargo";
import { Grids } from "./grids";
import { PlacingCargo } from "./placingCargo";
import { ReplacementBox } from "./replacementBox";

interface Props {
  deck: Deck;
  currentCargoPlacement: CargoPlacement;
  isOverview: boolean;
  setInitialCargoPlacement: (d: CargoPlacement) => void;
  bumperToBumperDistance: number;
  viewBoxDimensions: ViewBoxDimensions | undefined;
  mostForwardValidPlacementForLanes: MostForwardValidPlacementForLanes;
  replacingCargoPlacements: CargoPlacement[];
  notReplacingCargoPlacements: CargoPlacement[];
  replaceButtonClick: () => Promise<void>;
}

const DeckMap: React.FC<Props> = ({
  deck,
  currentCargoPlacement,
  isOverview = false,
  setInitialCargoPlacement,
  bumperToBumperDistance,
  viewBoxDimensions,
  mostForwardValidPlacementForLanes,
  replacingCargoPlacements,
  notReplacingCargoPlacements,
  replaceButtonClick,
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
    dispatch(setCurrentPlacement({ ...cargoPlacement, deckId: deck.name }));
  };

  const setCargoPlacementFromFrontPlacement = (placement: CargoPlacement) => {
    if (
      cargoIsEmpty(currentCargoPlacement.cargo) ||
      cargoPlacementIsEmpty(placement)
    )
      return;
    placement.LCG -= currentCargoPlacement.cargo.length / 2;
    setPlacement({ ...currentCargoPlacement, ...placement, deckId: deck.name });
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
    <div className="DeckMapBody">
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
            currentCargo={currentCargoPlacement.cargo}
            onLanePlacementButtonClick={setCargoPlacementFromFrontPlacement}
            mostForwardValidPlacementForLanes={
              mostForwardValidPlacementForLanes
            }
          />
          <Grids
            grids={deck.grids}
            onClick={setCargoPlacementFromFrontPlacement}
            currentCargo={currentCargoPlacement.cargo}
            cargoPlacements={notReplacingCargoPlacements}
            lanes={deck.lanes}
            mostForwardValidPlacementForLanes={
              mostForwardValidPlacementForLanes
            }
          />
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
            cargo={notReplacingCargoPlacements.filter(
              (cp) => cp.cargo.id !== currentCargoPlacement.cargo.id
            )}
            onCargoPlacementClick={(cp: CargoPlacement) =>
              onCargoPlacementClick(cp)
            }
          />
          <PlacingCargo
            currentCargoPlacement={currentCargoPlacement}
            lanes={deck.lanes}
            cargoPlacements={notReplacingCargoPlacements}
            svgRef={svgRef}
            setCurrentCargoPlacement={setPlacement}
            bumperToBumperDistance={bumperToBumperDistance}
          />
        </g>
      </svg>
    </div>
  );
};

export default DeckMap;
