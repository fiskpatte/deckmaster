import React from 'react';
import GridItem from './GridItem';
import { DECK_MAP } from '../../../shared/constants';
import { Grid } from './../../../shared/types/deckMap';
import { Coords } from '../../../shared/types/util';
import './Grid.scss';
import { GridName } from './GridName';

interface Props {
    grid: Grid,
    visible: boolean,
    onClick: (position: Coords) => void
}

const radius = DECK_MAP.GRID_RADIUS * Math.max(DECK_MAP.X_SCALE, DECK_MAP.Y_SCALE);

const boundingBoxRadius = radius * 8;

const GridComponent: React.FC<Props> = ({ grid, visible, onClick, ...rest }) => {
    if (!visible) return null;
    let gridPosition = { x: grid.LCG + grid.length / 2, y: grid.TCG }
    return (
        <g onClick={(ev) => { ev.stopPropagation(); onClick(gridPosition) }}>
            <GridItem {...rest} grid={grid} radius={radius} upper />
            <GridItem {...rest} grid={grid} radius={radius} />
            <GridName grid={grid} />
            <rect
                className="BoundingBox"
                x={grid.LCG - grid.length / 2 + boundingBoxRadius / 2}
                y={grid.TCG - grid.width / 2}
                width={grid.length}
                height={grid.width} />
        </g>
    );
}

export default GridComponent;