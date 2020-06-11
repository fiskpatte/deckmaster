import React from "react";
import { LaneButton } from "./laneButton";
import { DECK_MAP } from "../../../constants";
import { LaneName } from "./laneName";
import { Grids } from "../grids";
import { PlacedCargo } from "../placedCargo";
import { Lane, Cargo } from "../../../types/deckMap";
import { Placement } from "../../../types/util";
import "./Lane.scss";
import { getLanePlacement } from "../DeckMap.functions";
import { useSelector } from 'react-redux';
import { RootState } from "../../../store";

interface Props {
  lane: Lane;
  svgRef: React.RefObject<SVGSVGElement>;
  rightOrigin: number;
  onClick: (event: React.MouseEvent<SVGElement>) => void;
  onButtonClick: (placement: Placement) => void;
  currentCargo: Cargo;
}

const LaneComponent: React.FC<Props> = ({
  lane,
  svgRef,
  rightOrigin,
  onClick,
  onButtonClick,
  currentCargo,
  ...rest
}) => {
  const originX = lane.LCG - lane.length / 2;
  const originY = lane.TCG - lane.width / 2;
  const { bumperToBumperDistance, defaultVCG } = useSelector((state: RootState) => state.appReducer.settings);
  let lanePlacement = {
    LCG: originX + lane.length,
    TCG: originY + lane.width / 2,
    VCG: lane.VCG + currentCargo.height * defaultVCG,
    laneId: lane.id,
  } as Placement;
  let buttonVisible = true;
  let isOverflow = currentCargo.width > lane.width;

  lanePlacement = getLanePlacement(lane, currentCargo, lanePlacement, bumperToBumperDistance) ?? { ...lanePlacement, LCG: originX };
  if (lanePlacement.LCG === originX) buttonVisible = false;
  const freeSpace = lanePlacement.LCG - originX;
  return (
    <>
      <rect
        {...rest}
        className={`Lane`}
        x={originX}
        y={originY}
        width={freeSpace + 2 * DECK_MAP.LANE_BORDER_RADIUS}
        height={lane.width}
        rx={DECK_MAP.LANE_BORDER_RADIUS}
        ry={DECK_MAP.LANE_BORDER_RADIUS}
      // onClick={onClick}
      />
      <rect
        className={`LaneFull`}
        x={lanePlacement.LCG}
        y={originY}
        width={lane.length - freeSpace > bumperToBumperDistance ? lane.length - freeSpace : 0}
        height={lane.width}
        rx={DECK_MAP.LANE_BORDER_RADIUS}
        ry={DECK_MAP.LANE_BORDER_RADIUS}
      />
      <Grids
        grids={lane.grids}
        onClick={(pos) => onButtonClick(pos)}
        lanePlacement={lanePlacement}
        currentCargo={currentCargo}
        isOverflow={isOverflow}
        lane={lane}
      />
      <PlacedCargo cargo={lane.cargo} />
      <LaneName lane={lane} rightOrigin={rightOrigin} />
      <LaneButton
        onClick={(ev) => {
          ev.stopPropagation();
          onButtonClick(lanePlacement);
        }}
        lane={lane}
        visible={buttonVisible}
      />
    </>
  );
};

export default LaneComponent;
