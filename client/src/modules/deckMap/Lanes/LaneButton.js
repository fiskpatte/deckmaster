import React from 'react';
import { DECK_MAP } from './../../../shared/constants';
import ArrowIcon from './ArrowIcon';
// import { ReactComponent as ArrowIcon } from '../../../assets/icons/arrowIcon.svg';
const LaneButton = ({ lane, onClick }) => {
    const buttonHeight = lane.width * DECK_MAP.LANE_BUTTON_HEIGHT_RATIO;
    const originX = lane.LCG - lane.length / 2 - DECK_MAP.LANE_BUTTON_WIDTH / 2;
    const originY = lane.TCG - buttonHeight / 2;
    return (
        <>
            {/* <g filter="url(#filter0_d)"> */}
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
            {/* <filter id="filter0_d" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter> */}
        </>
    );
};

export default LaneButton;