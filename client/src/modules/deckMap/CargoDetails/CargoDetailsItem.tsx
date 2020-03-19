import React from 'react';
import { CargoDetailsItemProps } from '../DeckMap.types';

const CargoDetailsItem: React.FC<CargoDetailsItemProps> = ({ label, value }) => {
    return (
        <div className="CargoDetailItem">
            <div className="Label">
                {`${label}:`}
            </div>
            <div className="Value">
                {value}
            </div>
        </div>
    );
}

export default CargoDetailsItem