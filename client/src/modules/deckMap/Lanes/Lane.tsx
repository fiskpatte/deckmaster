import React from 'react';
import LaneButton from './LaneButton';
import { DECK_MAP } from '../../../shared/constants';
import LaneName from './LaneName';
import { LaneProps } from '../DeckMap.types';
import { Grids } from '../Grids';
import { PlacedCargo } from '../PlacedCargo';
import { arrayMin } from './../../../shared/functions/math';

const Lane: React.FC<LaneProps> = ({ lane, svgRef, rightOrigin, onClick, onButtonClick, ...rest }) => {
    const originX = lane.LCG - lane.length / 2;
    const originY = lane.TCG - lane.width / 2;
    let nextPosition = { x: originX + lane.length, y: originY + lane.width / 2 };
    let buttonVisible = true;
    const getNextPosition = () => {
        if (lane.cargo.length === 0) return;
        let minLCG = arrayMin(lane.cargo.map(c => c.LCG - c.length / 2));
        //TODO: Distance to deactivate the button should be fixed differently!
        if(minLCG < originX + 10) {
            buttonVisible = false;
            return;
        }
        //TODO: B2B distance from settings
        nextPosition.x = minLCG - 0.2
    }
    getNextPosition();
    return (
        <>
            <rect {...rest} x={originX} y={originY} width={lane.length} height={lane.width} rx={DECK_MAP.LANE_BORDER_RADIUS} ry={DECK_MAP.LANE_BORDER_RADIUS} onClick={onClick} />
            <Grids grids={lane.grids} onClick={(pos) => onButtonClick(pos, lane.id)} />
            <PlacedCargo cargo={lane.cargo} />
            <LaneName lane={lane} svgRef={svgRef} rightOrigin={rightOrigin} />
            <LaneButton onClick={(ev) => { ev.stopPropagation(); onButtonClick(nextPosition, lane.id); }} lane={lane} visible={buttonVisible} />
        </>
    )
};

export default Lane;