import React from "react";
import { DECK_MAP } from "../../../constants";
import { LaneName } from "./laneName";
import { Grids } from "../grids";
import { PlacedCargo } from "../placedCargo";
import { Lane, Cargo } from "../../../types/deckMap";
import { Placement } from "../../../types/util";
import "./Lane.scss";

interface Props {
  lane: Lane;
  rightOrigin: number;
  onLanePlacementButtonClick: (placement: Placement) => void;
  currentCargo: Cargo;
}

const LaneComponent: React.FC<Props> = ({
  lane,
  rightOrigin,
  onLanePlacementButtonClick,
  currentCargo
}) => {
  const originX = lane.LCG - lane.length / 2;
  const originY = lane.TCG - lane.width / 2;

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
      />

      <Grids
        grids={lane.grids}
        onClick={(pos) => onLanePlacementButtonClick(pos)}
        lanePlacement={{
          LCG: originX + lane.length,
          TCG: originY + lane.width / 2,
          VCG: lane.VCG + currentCargo.height * 0.45,
          laneId: lane.id,
        }}
        currentCargo={currentCargo}
        isOverflow={false}
        lane={lane}
      />
      <PlacedCargo cargo={lane.cargo} />
      <LaneName lane={lane} rightOrigin={rightOrigin} />
    </>
  );
};

export default LaneComponent;
