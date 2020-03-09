import React from 'react';
import GridItem from './GridItem';
import { DECK_MAP } from '../../../shared/constants';

const radius = DECK_MAP.GRID_RADIUS * Math.max(DECK_MAP.X_SCALE, DECK_MAP.Y_SCALE);

const Grid = ({ grid, visible, onClick, ...rest }) => {
    if (!visible) return null;
    return (
        <g onClick={onClick}>
            <GridItem {...rest} grid={grid} radius={radius} upper />
            <GridItem {...rest} grid={grid} radius={radius} />
            <rect
                className="BoundingBox"
                x={grid.LCG + grid.length / 2 - 2 * radius}
                y={grid.TCG - grid.width / 2}
                width={4 * radius}
                height={grid.width} />
        </g>
    );
}

export default Grid;