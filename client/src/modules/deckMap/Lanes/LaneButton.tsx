import React from 'react';
import { DECK_MAP } from '../../../shared/constants';
import ArrowIcon from './ArrowIcon';
import { LaneButtonProps } from '../types';

const LaneButton: React.FC<LaneButtonProps> = ({ lane, onClick }) => {
    const buttonHeight = lane.width * DECK_MAP.LANE_BUTTON_HEIGHT_RATIO;
    const originX = lane.LCG - lane.length / 2 - DECK_MAP.LANE_BUTTON_WIDTH / 2;
    const originY = lane.TCG - buttonHeight / 2;
    return (
        <g onClick={onClick}>
            <rect x={originX}
                y={originY}
                width={DECK_MAP.LANE_BUTTON_WIDTH}
                height={buttonHeight}
                rx={DECK_MAP.LANE_BORDER_RADIUS}
                ry={DECK_MAP.LANE_BORDER_RADIUS}
                className="LaneButton" />
            <ArrowIcon x={originX} y={originY} width={DECK_MAP.LANE_BUTTON_WIDTH} height={buttonHeight} />
        </g>
    );
};

export default LaneButton;