import React from "react";
import Text from "../../../components/text";

interface Props {
  label: string;
  value: string;
}

const CargoDetailsItem: React.FC<Props> = ({ label, value }) => {
  return (
    <div className="CargoDetailItem">
      <Text size="small" weight="light" value={`${label}:`} />
      <Text size="small" weight="medium" value={value} />
    </div>
  );
};

export default CargoDetailsItem;
