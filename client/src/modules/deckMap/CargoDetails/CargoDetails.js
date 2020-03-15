import React from 'react';
import Card from './../../../shared/components/card/Card';
import CargoDetailItem from './CargoDetailItem';
import Collapsible from '../../../shared/components/collapsible/Collapsible';
import './CargoDetails.scss'

const CargoDetails = ({ currentCargo }) => {
    const { registrationNumber, length, width, height, weight } = currentCargo;
    return (
        <div className="CargoDetails">
            <Card className="Card">
                <CargoDetailItem label="Cargo ID" value={registrationNumber} />
                <CargoDetailItem label="Length" value={`${length} meters`} />
                <CargoDetailItem label="Width" value={`${width} meters`} />
                <Collapsible>
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
    );
};

export default CargoDetails;