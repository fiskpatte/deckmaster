import React from 'react';
import { DECK_MAP } from '../../shared/constants';

const Grids = ({ grids }) => {

    const radius = DECK_MAP.GRID_RADIUS * Math.max(DECK_MAP.X_SCALE, DECK_MAP.Y_SCALE);

    const GridCircle = ({ grid, upper, ...rest }) => {
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

    const Grid = ({ grid, visible, onClick, ...rest }) => {
        if (!visible) return null;
        return (
            <g onClick={onClick}>
                <GridCircle {...rest} grid={grid} upper />
                <GridCircle {...rest} grid={grid} />
                <rect
                    x={grid.LCG + grid.length / 2 - 2 * radius}
                    y={grid.TCG - grid.width / 2}
                    width={4 * radius}
                    height={grid.width}
                    style={{ "fill": "none", "stroke": "none" }} />
            </g>
        );
    }

    return (
        <>
            {
                grids.map((grid, ix) => {
                    return (
                        <Grid grid={grid} visible={true} onClick={(ev) => { ev.stopPropagation(); console.log("Grid click"); }} key={ix} />
                    )
                })
            }
        </>
    )

}

export default Grids;