import React from 'react';
import LaneButton from './LaneButton';
import { DECK_MAP } from '../../../shared/constants';
import LaneName from './LaneName';
import { LaneProps } from '../DeckMap.types';
import Grids from '../Grids/Grids';

const Lane: React.FC<LaneProps> = ({ lane, svgRef, rightOrigin, onClick, onButtonClick, ...rest }) => {
    const originX = lane.LCG - lane.length / 2;
    const originY = lane.TCG - lane.width / 2;
    let nextPosition = { x: originX + lane.length, y: originY + lane.width / 2 };
    return (
        <>
            <rect {...rest} x={originX} y={originY} width={lane.length} height={lane.width} rx={DECK_MAP.LANE_BORDER_RADIUS} ry={DECK_MAP.LANE_BORDER_RADIUS} onClick={onClick} />
            <Grids grids={lane.grids} onClick={(pos) => onButtonClick(pos)}/>
            <LaneName lane={lane} svgRef={svgRef} rightOrigin={rightOrigin} />
            <LaneButton onClick={(ev) => { ev.stopPropagation(); onButtonClick(nextPosition); }} lane={lane} />
        </>
    )
};

export default Lane;