import React from 'react';
import Lane from './Lane';
import './Lane.scss'
import { LanesProps } from '../DeckMap.types';

export const Lanes: React.FC<LanesProps> = ({ lanes, svgRef, rightOrigin, onClick, onButtonClick }) => {

    return (
        <>
            {lanes.map((lane, ix) => {
                return (
                    <Lane key={ix}
                        lane={lane}
                        onClick={onClick}
                        onButtonClick={onButtonClick}
                        rightOrigin={rightOrigin}
                        svgRef={svgRef} />
                )
            })}
        </>
    );
}

export default Lanes;