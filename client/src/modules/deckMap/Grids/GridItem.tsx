import React from 'react';
import { DECK_MAP } from '../../../shared/constants';
import { GridItemProps } from '../types';

const GridItem: React.FC<GridItemProps> = ({ grid, upper, radius, ...rest }) => {
    let cy = 0;
    const borderMargin = 3 * radius;
    if (upper) {
        cy = (grid.TCG + grid.width / 2) * DECK_MAP.Y_SCALE - borderMargin;
    } else {
        cy = (grid.TCG - grid.width / 2) * DECK_MAP.Y_SCALE + borderMargin;
    }
    return (
        <circle {...rest}
            className="GridItem"
            transform={`scale(${1 / DECK_MAP.X_SCALE} ${1 / DECK_MAP.Y_SCALE})`}
            cx={(grid.LCG + grid.length / 2) * DECK_MAP.X_SCALE}
            cy={cy}
            r={radius} />
    );
}

export default GridItem