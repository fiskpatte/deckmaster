import React, { useRef } from 'react';
import { CargoIconProps } from './DeckMap.types';
import useReferenceScale from '../../shared/hooks/useReferenceScale';
import { ReactComponent as Icon } from '../../assets/icons/cargoIcon.svg';

//This component uses {x,y} as LCG and TCG coordinates
const CargoIcon: React.FC<CargoIconProps> = ({ x, y, width, height, placed = false }) => {
    const groupRef = useRef<SVGPathElement>(null);
    const scale = useReferenceScale(groupRef, { width, height });
    const corner = { x: x - width / 2, y: y - height / 2 };
    return (
        <svg width={width} height={height} x={corner.x} y={corner.y} fill="none" preserveAspectRatio="xMidYMid meet">
            <g ref={groupRef} className={`CargoIcon ${placed ? "Placed" : ""}`} transform={`scale(${scale.width} ${scale.height})`} >
                <Icon />
            </g>
        </svg>
    );
}

export default CargoIcon;