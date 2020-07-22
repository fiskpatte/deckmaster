import React from "react";
import { DECK_MAP } from "../../../constants";
import { LaneName } from "./laneName";
import { Grids } from "../grids";
import { PlacedCargoDefs } from "../placedCargo";
import { Lane } from "../../../types/deckMap";
import "./Lane.scss";

interface Props {
  lane: Lane;
  rightOrigin: number;
}

const LaneComponent: React.FC<Props> = ({
  lane,
  rightOrigin,
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
      />
      <PlacedCargoDefs cargoPlacements={lane.cargo} />
      <LaneName lane={lane} rightOrigin={rightOrigin} />
    </>
  );
};

export default LaneComponent;
