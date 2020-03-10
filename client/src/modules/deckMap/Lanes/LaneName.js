import React, { useRef, useEffect, useState } from 'react';
import { DECK_MAP } from '../../../shared/constants';

const LaneName = ({ lane, y }) => {
    const originX = lane.LCG + lane.length / 2 + DECK_MAP.X_MARGIN / 2;
    const textRef = useRef();
    const scaleRef = useRef(1);
    const [scale, setScale] = useState(1);
    useEffect(() => {
        let textBBox = textRef.current.getBBox();
        let widthScale = DECK_MAP.LANE_NAME_WIDTH / textBBox.width;
        let heightScale = lane.width / textBBox.height;
        scaleRef.current = DECK_MAP.LANE_NAME_FONT_SIZE * Math.min(widthScale, heightScale);
        setScale(scaleRef.current);
    }, [lane.width])
    return (
        <text className={`LaneName ${lane.partial ? "Hidden" : ""}`}
            transform={`scale(${1 / DECK_MAP.X_SCALE} ${1 / DECK_MAP.Y_SCALE})`}
            fontSize={`${scale}em`}
            x={originX * DECK_MAP.X_SCALE}
            y={lane.TCG * DECK_MAP.Y_SCALE}
            ref={textRef}>
            {lane.name}
        </text>
    );
}

export default LaneName;