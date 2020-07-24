import React, { useRef, useCallback, useEffect, useState } from "react";
import { DECK_MAP } from "../../constants";
import { Lanes } from "./lanes";
import {
  getViewBoxOriginX,
  getViewBoxOriginY,
  getViewBoxSizeX,
  getViewBoxSizeY,
  getRulerOrigin,
  onCargoDrag,
  pinCargoAfterDrag,
  updatePlacementFromFrontPlacement,
} from "./DeckMap.functions";
import { CargoIcon } from "./cargoIcon";
import { Placement } from "../../types/util";
import { useDispatch } from "react-redux";
import {
  setCurrentPlacement,
  setCurrentCargo,
} from "../../store/deckMap/deckMapActions";
import { Deck, Cargo, CargoPlacement } from "../../types/deckMap";
import "./DeckMap.scss";
import { FrameRuler } from "./frameRuler";
import { Loader } from "./../../components/loader/Loader";

interface Props {
  deck: Deck;
  currentCargo: Cargo;
  currentPlacement: Placement | null;
  isOverview: boolean;
  setInitialCargoPlacement: (d: CargoPlacement) => void;
}
interface ViewBoxDimensions {
  sizeX: number;
  sizeY: number;
  originX: number;
  originY: number;
}
const DeckMap: React.FC<Props> = ({
  deck,
  currentCargo,
  currentPlacement,
  isOverview = false,
  setInitialCargoPlacement,
}) => {
  const dispatch = useDispatch();
  const setPlacement = useCallback(
    (placement: Placement) => dispatch(setCurrentPlacement(placement)),
    [dispatch]
  );
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

  const onCargoPlacementClick = (cargoPlacement: CargoPlacement) => {
    if (isOverview && currentCargo.id !== cargoPlacement.cargo.id) {
      setInitialCargoPlacement({ ...cargoPlacement });
    }

    dispatch(setCurrentCargo({ ...cargoPlacement.cargo }));
    dispatch(setCurrentPlacement({ ...cargoPlacement }));
  };

  if (!viewBoxDimensions) return <Loader />;

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
          currentCargo={currentCargo}
          onLanePlacementButtonClick={(placement) =>
            updatePlacementFromFrontPlacement(
              placement,
              currentCargo,
              setPlacement
            )
          }
        />
        <FrameRuler frames={deck.frames} originY={getRulerOrigin(deck)} />
        {/* This makes sure that the cargo is always visible over lanes */}
        {deck.lanes.map((lane, ix) =>
          lane.cargo.map(
            (c, ixc) =>
              c.cargo.id !== currentCargo.id && (
                <use
                  key={100 * ix + ixc}
                  href={`#cargoIcon${c.id}`}
                  onClick={() => onCargoPlacementClick(c)}
                />
              )
          )
        )}
        {!!currentPlacement && (
          <CargoIcon
            x={currentPlacement.LCG}
            y={currentPlacement.TCG}
            width={currentCargo.length}
            height={currentCargo.width}
            placing={true}
            dragCallback={(ev) =>
              onCargoDrag(
                ev,
                deck,
                currentPlacement,
                currentCargo,
                svgRef,
                setPlacement
              )
            }
            dragEndCallback={() =>
              pinCargoAfterDrag(
                deck,
                currentPlacement,
                currentCargo,
                setPlacement
              )
            }
            cargoId={currentCargo.id}
          />
        )}
      </g>
    </svg>
  );
};

export default DeckMap;
