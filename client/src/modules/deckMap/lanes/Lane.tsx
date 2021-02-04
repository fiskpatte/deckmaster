import React from "react";
import { ArrowButton } from "../arrowButton";
import { DECK_MAP } from "../../../constants";
import { LaneName } from "./laneName";
import { Lane, Cargo, ValidPlacementInterval } from "../../../types/deckMap";
import "./Lane.scss";
import {
  getValidPlacementIntervalForLanePlacement,
  isOverflowing,
} from "../DeckMap.functions";

interface Props {
  lane: Lane;
  rightOrigin: number;
  currentCargo: Cargo;
  validPlacementIntervalsForLane: ValidPlacementInterval[];
  onLaneClick: (
    event: React.MouseEvent | React.TouchEvent | React.PointerEvent,
    lane: Lane
  ) => void;
}

const LaneComponent: React.FC<Props> = ({
  lane,
  rightOrigin,
  currentCargo,
  validPlacementIntervalsForLane,
  onLaneClick,
}) => {
  const originX = lane.LCG - lane.length / 2;
  const originY = lane.TCG - lane.width / 2;

  let lanePlacementButtonVisible = true;
  if (
    !getValidPlacementIntervalForLanePlacement(
      validPlacementIntervalsForLane,
      isOverflowing(currentCargo, lane)
    )
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
        onClick={(event) => onLaneClick(event, lane)}
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
