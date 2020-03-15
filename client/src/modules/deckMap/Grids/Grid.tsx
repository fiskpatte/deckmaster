import React from 'react';
import GridItem from './GridItem';
import { DECK_MAP } from '../../../shared/constants';
import { GridProps } from '../types';

const radius = DECK_MAP.GRID_RADIUS * Math.max(DECK_MAP.X_SCALE, DECK_MAP.Y_SCALE);
const boundingBoxRadius = radius * 8;
const Grid: React.FC<GridProps> = ({ grid, visible, onClick, ...rest }) => {
    if (!visible) return null;
    return (
        <g onClick={onClick}>
            <GridItem {...rest} grid={grid} radius={radius} upper />
            <GridItem {...rest} grid={grid} radius={radius} />
            <rect
                className="BoundingBox"
                x={grid.LCG + grid.length / 2 - boundingBoxRadius / 2}
                y={grid.TCG - grid.width / 2}
                width={boundingBoxRadius}
                height={grid.width} />
        </g>
    );
}

export default Grid;