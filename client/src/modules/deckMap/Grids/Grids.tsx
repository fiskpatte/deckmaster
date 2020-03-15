import React from 'react';
import Grid from './Grid';
import { GridsProps } from '../types';

const Grids: React.FC<GridsProps> = ({ grids }) => {

    return (
        <>
            {
                grids.map((grid, ix) => {
                    return (
                        <Grid grid={grid}
                            visible={true}
                            onClick={(ev) => { ev.stopPropagation(); console.log("Grid click"); }}
                            key={ix} />
                    )
                })
            }
        </>
    )

}

export default Grids;