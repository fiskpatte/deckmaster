import React from 'react';
import Grid from './Grid';
import { GridsProps } from '../DeckMap.types';

export const Grids: React.FC<GridsProps> = ({ grids,onClick }) => {

    return (
        <>
            {
                grids.map((grid, ix) => {
                    return (
                        <Grid grid={grid}
                            visible={true}
                            onClick={onClick}
                            key={ix} />
                    )
                })
            }
        </>
    )

}

export default Grids;