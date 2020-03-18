import React from 'react';
import Lane from './Lane';
import './Lane.scss'
import { LanesProps } from '../types';

const Lanes: React.FC<LanesProps> = ({ lanes, svgRef, rightOrigin, onClick }) => {

    return (
        <>
            {lanes.map((lane, ix) => {
                return (
                    <Lane key={ix}
                        lane={lane}
                        onClick={onClick}
                        rightOrigin={rightOrigin}
                        svgRef={svgRef} />
                )
            })}
        </>
    );
}

export default Lanes;