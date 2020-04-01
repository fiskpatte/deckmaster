<<<<<<< HEAD
import React from "react";
import { CargoDetailsItemProps } from "../DeckMap.types";

const CargoDetailsItem: React.FC<CargoDetailsItemProps> = ({
  label,
  value
}) => {
  return (
    <div className="CargoDetailItem">
      <div className="Label">{`${label}:`}</div>
      <div className="Value">{value}</div>
    </div>
  );
};
=======
import React from 'react';

interface Props {
    label: string,
    value: string
}

const CargoDetailsItem: React.FC<Props> = ({ label, value }) => {
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
>>>>>>> ccbb0cb15cc9cf8d7881a4d451cf130c504216fe

export default CargoDetailsItem;
