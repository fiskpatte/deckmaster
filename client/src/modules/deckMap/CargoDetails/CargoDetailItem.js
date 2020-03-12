import React from 'react';

const CargoDetailItem = ({ label, value }) => {
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

export default CargoDetailItem