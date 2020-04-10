import React from "react";
import { LaneButton } from "./laneButton";
import { DECK_MAP } from "../../../constants";
import { LaneName } from "./laneName";
import { Grids } from "../grids";
import { PlacedCargo } from "../placedCargo";
import { arrayMin } from "../../../functions/math";
import { Lane } from "../../../types/deckMap";
import { Coords } from "../../../types/util";
import "./Lane.scss";

interface Props {
  lane: Lane;
  svgRef: React.RefObject<SVGSVGElement>;
  rightOrigin: number;
  onClick: (event: React.MouseEvent<SVGElement>) => void;
  onButtonClick: (position: Coords, laneID: number) => void;
}

const LaneComponent: React.FC<Props> = ({
  lane,
  svgRef,
  rightOrigin,
  onClick,
  onButtonClick,
  ...rest
}) => {
  const originX = lane.LCG - lane.length / 2;
  const originY = lane.TCG - lane.width / 2;
  let nextPosition = {
    x: originX + lane.length,
    y: originY + lane.width / 2,
  } as Coords;
  let buttonVisible = true;
  const getNextPosition = () => {
    if (lane.cargo.length === 0) return;
    let minLCG = arrayMin(lane.cargo.map((c) => c.LCG - c.length / 2));
    //TODO: Distance to deactivate the button should be fixed differently! (setting)
    if (minLCG < originX + 10) {
      buttonVisible = false;
    }
    //TODO: B2B distance from settings
    nextPosition.x = minLCG - 0.2;
  };
  getNextPosition();
  return (
    <>
      <rect
        {...rest}
        className={`Lane ${buttonVisible ? "" : "Full"}`}
        x={originX}
        y={originY}
        width={lane.length}
        height={lane.width}
        rx={DECK_MAP.LANE_BORDER_RADIUS}
        ry={DECK_MAP.LANE_BORDER_RADIUS}
        onClick={onClick}
      />
      <Grids
        grids={lane.grids}
        onClick={(pos) => onButtonClick(pos, lane.id)}
        nextPosition={nextPosition}
      />
      <PlacedCargo cargo={lane.cargo} />
      <LaneName lane={lane} rightOrigin={rightOrigin} />
      <LaneButton
        onClick={(ev) => {
          ev.stopPropagation();
          onButtonClick(nextPosition, lane.id);
        }}
        lane={lane}
        visible={buttonVisible}
      />
    </>
  );
};

export default LaneComponent;
