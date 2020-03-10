import React from 'react';
import Lane from './Lane';
import './Lane.scss'

const Lanes = ({ lanes }) => {

    return (
        <>
            {lanes.map((lane, ix) => {
                return (
                    <Lane key={ix}
                        lane={lane}
                        className="Lane"
                        onClick={(ev) => { ev.stopPropagation(); console.log("lane clicked"); }} />
                )
            })}
        </>
    );
}

export default Lanes;