import React from 'react';

const Lanes = ({ lanes }) => {
    const Lane = ({ lane, ...rest }) => {
        let originX = lane.LCG - lane.length / 2;
        let originY = lane.TCG - lane.width / 2;
        return (
            <rect {...rest} x={originX} y={originY} width={lane.length} height={lane.width} rx="0.5" ry="0.5" />
        )
    };

    return (
        <>
            {lanes.map((lane, ix) => {
                return (
                    <Lane key={ix} lane={lane} style={{ pointerEvents: "none" }} />
                )
            })}
        </>
    );
}

export default Lanes;