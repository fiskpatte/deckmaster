import React from "react";

interface Props {
  label: string;
  value: string;
}

const CargoDetailsItem: React.FC<Props> = ({ label, value }) => {
  return (
    <div className="CargoDetailItem">
      <div className="Label">{`${label}:`}</div>
      <div className="Value">{value}</div>
    </div>
  );
};

export default CargoDetailsItem;
