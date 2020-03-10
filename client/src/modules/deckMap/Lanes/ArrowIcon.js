import React, { useState, useEffect, useRef } from 'react';
import { DECK_MAP } from '../../../shared/constants';

const ArrowIcon = ({ x, y, width, height }) => {
    const pathRef = useRef();
    const scaleRef = useRef(1);
    const [scale, setScale] = useState({ width: 1, height: 1 });
    const arrowWidth = width * DECK_MAP.BUTTON_ARROW_RATIO;
    const arrowHeight = height * DECK_MAP.BUTTON_ARROW_RATIO;
    useEffect(() => {
        let pathBBox = pathRef.current.getBBox();
        let widthScale = arrowWidth / pathBBox.width;
        let heightScale = arrowHeight / pathBBox.height;
        scaleRef.current = { width: widthScale, height: heightScale };
        setScale(scaleRef.current);
    }, [arrowWidth, arrowHeight])
    return (
        <svg width={width} height={height} x={x} y={y} fill="none" preserveAspectRatio="xMidYMid meet">
            <path ref={pathRef} 
                transform={`scale(${scale.width} ${scale.height}) translate(${-width / 2 * DECK_MAP.X_SCALE} ${-height / 2 * DECK_MAP.Y_SCALE})`} 
                d="M32.1 8.1L32.8 11.2H19.3H7.8V15.7V20.2H19.3H32.8L32.1 23.2C31.7 25.1 33.9 26.4 35.4 25.1L46.2 15.7L35.4 6.2C33.9 4.9 31.7 6.3 32.1 8.1Z" 
                fill="white" 
                stroke="none" />
        </svg>
    );
}

export default ArrowIcon;