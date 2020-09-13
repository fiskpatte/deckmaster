import React from "react";
import { LaneButton } from "./laneButton";
import { DECK_MAP } from "../../../constants";
import { LaneName } from "./laneName";
import { Lane, Cargo, CargoPlacement } from "../../../types/deckMap";
import "./Lane.scss";
import { cargoPlacementIsEmpty } from "../DeckMap.functions";

interface Props {
  lane: Lane;
  rightOrigin: number;
  onLanePlacementButtonClick: (placement: CargoPlacement) => void;
  currentCargo: Cargo;
  mostForwardValidPlacementForLane: CargoPlacement;
}

const LaneComponent: React.FC<Props> = ({
  lane,
  rightOrigin,
  onLanePlacementButtonClick,
  currentCargo,
  mostForwardValidPlacementForLane
}) => {
  const originX = lane.LCG - lane.length / 2;
  const originY = lane.TCG - lane.width / 2;

  let lanePlacementButtonVisible = true;

  if (cargoPlacementIsEmpty(mostForwardValidPlacementForLane) || mostForwardValidPlacementForLane.LCG === originX)
    lanePlacementButtonVisible = false;

  return (
    <>
      <rect
        className={`Lane`}
        x={originX}
        y={originY}
        width={lane.length + 2 * DECK_MAP.LANE_BORDER_RADIUS}
        height={lane.width}
        rx={DECK_MAP.LANE_BORDER_RADIUS}
        ry={DECK_MAP.LANE_BORDER_RADIUS}
      // onClick={onClick}
      />
      <LaneName lane={lane} rightOrigin={rightOrigin} />
      <LaneButton
        onClick={ev => {
          ev.stopPropagation();
          onLanePlacementButtonClick(mostForwardValidPlacementForLane);
        }}
        lane={lane}
        visible={lanePlacementButtonVisible && !!currentCargo.id}
      />
    </>
  );
};

export default LaneComponent;
