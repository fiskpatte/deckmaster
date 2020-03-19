import React, { useRef } from 'react';
// import { DECK_MAP } from './../../shared/constants';
import { CargoIconProps } from './DeckMap.types';
import useReferenceScale from '../../shared/hooks/useReferenceScale';
import { ReactComponent as Icon } from '../../assets/icons/cargoIcon.svg';

const CargoIcon: React.FC<CargoIconProps> = ({ x, y, width, height, placed = false }) => {
    const groupRef = useRef<SVGPathElement>(null);
    const scale = useReferenceScale(groupRef, { width, height });

    return (
        <svg width={width} height={height} x={x} y={y} fill="none" preserveAspectRatio="xMidYMid meet">
            <g ref={groupRef} className={`CargoIcon ${placed ? "Placed" : ""}`} transform={`scale(${scale.width} ${scale.height})`} >
                <Icon/>
            </g>
        </svg>
    );
}

export default CargoIcon;