import React from "react";
import { LaneButton } from "./laneButton";
import { DECK_MAP } from "../../../constants";
import { LaneName } from "./laneName";
import { Grids } from "../grids";
// import { PlacedCargo } from "../placedCargo";
import { Lane, Cargo } from "../../../types/deckMap";
import { Placement } from "../../../types/util";
import "./Lane.scss";
import { getMostForwardValidPlacementForLane } from "../DeckMap.functions";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  getCargoPlacementsForLane,
  getOverflowingCargoPlacementsIntoLane,
} from "../../../store/deckMap/deckMapSelectors";

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
  currentCargo,
}) => {
  const originX = lane.LCG - lane.length / 2;
  const originY = lane.TCG - lane.width / 2;
  const { bumperToBumperDistance, defaultVCG } = useSelector(
    (state: RootState) => state.appReducer.settings
  );
  const cargoPlacementsForLane = useSelector(
    getCargoPlacementsForLane(lane.id)
  );
  const overflowingCargoPlacementsIntoLane = useSelector(
    getOverflowingCargoPlacementsIntoLane(lane.id)
  );
  let mostForwardValidPlacement = {
    LCG: originX + lane.length,
    TCG: originY + lane.width / 2,
    VCG: lane.VCG + currentCargo.height * defaultVCG,
    laneId: lane.id,
  } as Placement;
  let lanePlacementButtonVisible = true;
  let isOverflow = currentCargo.width > lane.width;

  mostForwardValidPlacement = getMostForwardValidPlacementForLane(
    lane,
    cargoPlacementsForLane,
    overflowingCargoPlacementsIntoLane,
    currentCargo,
    mostForwardValidPlacement,
    bumperToBumperDistance
  ) ?? { ...mostForwardValidPlacement, LCG: originX };
  if (mostForwardValidPlacement.LCG === originX)
    lanePlacementButtonVisible = false;
  // const freeSpace = mostForwardValidPlacement.LCG - originX;

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
      {/* <rect
        className={`LaneFull`}
        x={mostForwardValidPlacement.LCG}
        y={originY}
        width={
          lane.length - freeSpace > bumperToBumperDistance
            ? lane.length - freeSpace
            : 0
        }
        height={lane.width}
        rx={DECK_MAP.LANE_BORDER_RADIUS}
        ry={DECK_MAP.LANE_BORDER_RADIUS}
      /> */}
      <Grids
        grids={lane.grids}
        onClick={(pos) => onLanePlacementButtonClick(pos)}
        lanePlacement={mostForwardValidPlacement}
        currentCargo={currentCargo}
        isOverflow={isOverflow}
        lane={lane}
      />
      {/* <PlacedCargo cargo={lane.cargo} /> */}
      <LaneName lane={lane} rightOrigin={rightOrigin} />
      <LaneButton
        onClick={(ev) => {
          ev.stopPropagation();
          onLanePlacementButtonClick(mostForwardValidPlacement);
        }}
        lane={lane}
        visible={lanePlacementButtonVisible}
      />
    </>
  );
};

export default LaneComponent;
