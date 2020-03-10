import React from 'react';
import LaneButton from './LaneButton';
import { DECK_MAP } from './../../../shared/constants';
import LaneName from './LaneName';

const Lane = ({ lane, ...rest }) => {
    const originX = lane.LCG - lane.length / 2;
    const originY = lane.TCG - lane.width / 2;

    return (
        <>
            <rect {...rest} x={originX} y={originY} width={lane.length} height={lane.width} rx={DECK_MAP.LANE_BORDER_RADIUS} ry={DECK_MAP.LANE_BORDER_RADIUS} />
            <LaneName lane={lane} />
            <LaneButton onClick={(ev) => { ev.stopPropagation(); console.log("Lanebutton clicked"); }} lane={lane} />
        </>
    )
};

export default Lane;