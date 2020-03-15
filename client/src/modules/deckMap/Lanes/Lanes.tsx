import React from 'react';
import Lane from './Lane';
import './Lane.scss'
import { LanesProps } from '../types';

const Lanes:React.FC<LanesProps> = ({ lanes, svgRef, rightOrigin }) => {

    return (
        <>
            {lanes.map((lane, ix) => {
                return (
                    <Lane key={ix}
                        lane={lane}
                        onClick={(ev) => { ev.stopPropagation(); console.log("lane clicked"); }} 
                        rightOrigin={rightOrigin}
                        svgRef={svgRef} />
                )
            })}
        </>
    );
}

export default Lanes;