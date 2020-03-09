import React from 'react';
import { DECK_MAP } from '../../../shared/constants';

const GridItem = ({ grid, upper, radius, ...rest }) => {
    let cy = 0;
    if (upper) {
        cy = (grid.TCG + grid.width / 2) * DECK_MAP.Y_SCALE - radius;
    } else {
        cy = (grid.TCG - grid.width / 2) * DECK_MAP.Y_SCALE + radius;
    }
    return (
        <circle {...rest}
            transform={`scale(${1 / DECK_MAP.X_SCALE} ${1 / DECK_MAP.Y_SCALE})`}
            cx={(grid.LCG + grid.length / 2) * DECK_MAP.X_SCALE}
            cy={cy}
            r={radius}
            fill="blue" />
    );
}

export default GridItem