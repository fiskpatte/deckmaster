import React, { useState } from 'react';
import Card from '../../../shared/components/card/Card';
import CargoDetailItem from './CargoDetailsItem';
import Collapsible from '../../../shared/components/collapsible/Collapsible';
import './CargoDetails.scss';
import variables from './CargoDetails.scss';
import { CargoDetailsProps } from '../types';
import Overlay from './../../../shared/components/overlay/Overlay';

const CargoDetails: React.FC<CargoDetailsProps> = ({ currentCargo }) => {
    const { registrationNumber, length, width, height, weight } = currentCargo;
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <>
            <div className="CargoDetails">
                <Card className="Card">
                    <CargoDetailItem label="Cargo ID" value={registrationNumber} />
                    <CargoDetailItem label="Length" value={`${length} meters`} />
                    <CargoDetailItem label="Width" value={`${width} meters`} />
                    <Collapsible isCollapsedParent={isCollapsed} setIsCollapsedParent={() => setIsCollapsed(!isCollapsed)}>
                        <CargoDetailItem label="Height" value={`${height} meters`} />
                        <CargoDetailItem label="Weight" value={`${weight} t`} />
                        <Card className="Button" onClick={() => console.log("Edit details click")}>
                            {"Edit details"}
                        </Card>
                        <Card className="Button" onClick={() => console.log("Change cargo click")}>
                            {"Change cargo"}
                        </Card>
                    </Collapsible>
                </Card>
            </div>
            <Overlay visible={!isCollapsed} transparent={true} onClick={() => setIsCollapsed(true)} animate={false} zIndex={variables.cargoDetailsOverlayZIndex} />
        </>
    );
};

export default CargoDetails;