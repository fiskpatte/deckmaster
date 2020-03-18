import React, { useState, useEffect, useRef } from 'react';
// import { DECK_MAP } from './../../shared/constants';
import { CargoIconProps } from './types';

const CargoIcon: React.FC<CargoIconProps> = ({ x, y, width, height }) => {
    const groupRef = useRef<SVGPathElement>(null);
    const scaleRef = useRef<any>({});
    const [scale, setScale] = useState({ width: 1, height: 1 });
    useEffect(() => {
        if (groupRef.current) {
            let pathBBox = groupRef.current.getBBox();
            let widthScale = width / pathBBox.width;
            let heightScale = height / pathBBox.height;
            if (scaleRef.current) {
                scaleRef.current = { width: widthScale, height: heightScale };
                setScale(scaleRef.current);
            }
        }
    }, [width, height])
    return (
        <svg width={width} height={height} x={x} y={y} fill="none" preserveAspectRatio="xMidYMid meet">
            <g ref={groupRef} className="CargoIcon" transform={`scale(${scale.width} ${scale.height})`} >
                <rect x="82.3" width="36.6" height="82.3" rx="1" transform="rotate(90 82.3433 0)" />
                <rect x="114" y="1.4" width="33.8" height="29.1" rx="0.5" transform="rotate(90 113.977 1.41559)" style={{fill:"#F2F2F2"}} />
                <path d="M75 4.5H6V31.5H75" style={{strokeWidth:0.7,stroke:"white"}} />
                <rect x="88.4" y="1.8" width="33" height="3" transform="rotate(90 88.3682 1.8313)" />
                <rect x="103.4" y="4.6" width="27.5" height="15.1" rx="1" transform="rotate(90 103.431 4.57825)" />
                <line y1="-0.5" x2="8.4" y2="-0.5" transform="matrix(-0.837938 0.545765 -0.616665 -0.787226 108.452 0.915588)" />
                <line y1="-0.5" x2="8.4" y2="-0.5" transform="matrix(0.837917 0.545798 -0.616698 0.7872 101.423 31.1326)" />
                <path d="M102.9 5.5C103.3 7.8 103.8 12.5 103.8 18.3 103.8 22.2 103.6 26.6 102.9 31.1" style={{strokeOpacity:0.8}} />
                <path d="M113.5 1.5C115 1.5 118.5 4.7 118.5 8.7 118.5 8.7 118.5 24.5 118.5 28 118.5 31.5 115.5 35 113.5 35" />
                <path d="M118.5 8.2V28L114 35H108C110.4 21.8 110.5 14.4 108 1.5L114 1.5 118.5 8.2Z" />
            </g>
        </svg>
    );
}

export default CargoIcon;