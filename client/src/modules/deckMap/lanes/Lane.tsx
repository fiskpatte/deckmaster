import React from "react";
import { ArrowButton } from "../arrowButton";
import { DECK_MAP } from "../../../constants";
import { LaneName } from "./laneName";
import { Lane, Cargo, CargoPlacement } from "../../../types/deckMap";
import "./Lane.scss";
import { cargoPlacementIsEmpty } from "../DeckMap.functions";
import { useSelector } from "react-redux";
import { getVCGForCargoAndLane } from "../../../store/app/appSelectors";

interface Props {
  lane: Lane;
  rightOrigin: number;
  currentCargo: Cargo;
  mostForwardValidPlacementForLane: CargoPlacement;
  onLaneClick: (
    event: React.MouseEvent | React.TouchEvent | React.PointerEvent,
    lane: Lane,
    VCG: number
  ) => void;
}

const LaneComponent: React.FC<Props> = ({
  lane,
  rightOrigin,
  currentCargo,
  mostForwardValidPlacementForLane,
  onLaneClick,
}) => {
  const originX = lane.LCG - lane.length / 2;
  const originY = lane.TCG - lane.width / 2;

  let lanePlacementButtonVisible = true;
  let VCG = useSelector(getVCGForCargoAndLane(currentCargo, lane));
  if (
    cargoPlacementIsEmpty(mostForwardValidPlacementForLane) ||
    mostForwardValidPlacementForLane.LCG === originX
  )
    lanePlacementButtonVisible = false;

  return (
    <>
      <rect
        className={`Lane`}
        x={originX}
        y={originY}
        width={lane.length}
        height={lane.width}
        rx={DECK_MAP.LANE_BORDER_RADIUS}
        ry={DECK_MAP.LANE_BORDER_RADIUS}
        onClick={(event) => onLaneClick(event, lane, VCG)}
      />
      <LaneName lane={lane} rightOrigin={rightOrigin} />
      <defs>
        <ArrowButton
          id={`arrowButton_${lane.id}`}
          visible={lanePlacementButtonVisible && !!currentCargo.id}
          x={lane.LCG - lane.length / 2}
          y={lane.TCG}
          height={lane.width * DECK_MAP.ARROW_BUTTON_HEIGHT_RATIO}
          width={DECK_MAP.LANE_BUTTON_WIDTH}
        />
      </defs>
    </>
  );
};

export default LaneComponent;
