import React, { useRef, useCallback, useEffect, useState } from "react";
import { DECK_MAP } from "../../constants";
import { Lanes } from "./lanes";
import {
  getViewBoxOriginX,
  getViewBoxOriginY,
  getViewBoxSizeX,
  getViewBoxSizeY,
  getDeckMapBottom,
  cargoIsEmpty,
  cargoPlacementIsEmpty,
  getMostForwardValidPlacementForLanes,
  getReplacementBoxOrigin,
} from "./DeckMap.functions";
import { useDispatch } from "react-redux";
import { setCurrentPlacement } from "../../store/deckMap/deckMapActions";
import {
  Deck,
  CargoPlacement,
  MostForwardValidPlacementForLanes,
} from "../../types/deckMap";
import "./DeckMap.scss";
import FrameRuler from "./frameRuler";
import { Loader } from "./../../components/loader";
import { PlacedCargo } from "./placedCargo";
import { Grids } from "./grids";
import { PlacingCargo } from "./placingCargo";
import { ReplacementBox } from "./replacementBox";

interface Props {
  deck: Deck;
  currentCargoPlacement: CargoPlacement;
  isOverview: boolean;
  setInitialCargoPlacement: (d: CargoPlacement) => void;
  cargoPlacements: CargoPlacement[];
  bumperToBumperDistance: number;
  defaultVCG: number;
  setShowPageLoader: (val: boolean) => void;
}
interface ViewBoxDimensions {
  sizeX: number;
  sizeY: number;
  originX: number;
  originY: number;
}

const DeckMap: React.FC<Props> = ({
  deck,
  currentCargoPlacement,
  isOverview = false,
  setInitialCargoPlacement,
  cargoPlacements,
  bumperToBumperDistance,
  defaultVCG,
  setShowPageLoader,
}) => {
  const dispatch = useDispatch();
  const setPlacement = useCallback(
    (placement: CargoPlacement) => dispatch(setCurrentPlacement(placement)),
    [dispatch]
  );
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBoxDimensions, setViewBoxDimensions] = useState<
    ViewBoxDimensions
  >();
  const [
    mostForwardValidPlacementForLanes,
    setMostForwardValidPlacementForLanes,
  ] = useState<MostForwardValidPlacementForLanes>();
  const [
    notReplacingCargoPlacements,
    setNotReplacingCargoPlacements,
  ] = useState<CargoPlacement[]>([]);
  const [replacingCargoPlacements, setReplacingCargoPlacements] = useState<
    CargoPlacement[]
  >([]);
  useEffect(() => {
    setViewBoxDimensions({
      sizeX: getViewBoxSizeX(deck),
      sizeY: getViewBoxSizeY(deck),
      originX: getViewBoxOriginX(deck),
      originY: getViewBoxOriginY(deck),
    });
  }, [deck]);

  useEffect(() => {
    if (!viewBoxDimensions || !mostForwardValidPlacementForLanes) {
      setShowPageLoader(true);
    } else {
      setShowPageLoader(false);
    }
  }, [viewBoxDimensions, mostForwardValidPlacementForLanes]);

  useEffect(() => {
    const notReplacingCargoPlacements =
      cargoPlacements.filter((cp) => !cp.replacing) ?? [];
    const replacingCargoPlacements =
      cargoPlacements.filter((cp) => cp.replacing) ?? [];
    setNotReplacingCargoPlacements(notReplacingCargoPlacements);
    setReplacingCargoPlacements(replacingCargoPlacements);
  }, [cargoPlacements]);

  useEffect(() => {
    setMostForwardValidPlacementForLanes(
      getMostForwardValidPlacementForLanes(
        deck.lanes,
        notReplacingCargoPlacements,
        currentCargoPlacement.cargo,
        bumperToBumperDistance,
        defaultVCG
      )
    );
  }, [
    deck.lanes,
    notReplacingCargoPlacements,
    currentCargoPlacement,
    bumperToBumperDistance,
    defaultVCG,
  ]);

  const onCargoPlacementClick = (cargoPlacement: CargoPlacement) => {
    if (!isOverview) return;
    if (currentCargoPlacement.cargo.id !== cargoPlacement.cargo.id) {
      setInitialCargoPlacement({ ...cargoPlacement });
    }
    dispatch(setCurrentPlacement({ ...cargoPlacement }));
  };

  const setCargoPlacementFromFrontPlacement = (placement: CargoPlacement) => {
    if (
      cargoIsEmpty(currentCargoPlacement.cargo) ||
      cargoPlacementIsEmpty(placement)
    )
      return;
    placement.LCG -= currentCargoPlacement.cargo.length / 2;
    setPlacement({ ...currentCargoPlacement, ...placement });
  };

  if (!viewBoxDimensions || !mostForwardValidPlacementForLanes)
    return <Loader />;

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
          mostForwardValidPlacementForLanes={mostForwardValidPlacementForLanes}
        />
        <Grids
          grids={deck.grids}
          onClick={setCargoPlacementFromFrontPlacement}
          currentCargo={currentCargoPlacement.cargo}
          cargoPlacements={notReplacingCargoPlacements}
          lanes={deck.lanes}
          mostForwardValidPlacementForLanes={mostForwardValidPlacementForLanes}
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
          cargoPlacements={cargoPlacements}
          svgRef={svgRef}
          setCurrentCargoPlacement={setPlacement}
          bumperToBumperDistance={bumperToBumperDistance}
        />
      </g>
    </svg>
  );
};

export default DeckMap;
