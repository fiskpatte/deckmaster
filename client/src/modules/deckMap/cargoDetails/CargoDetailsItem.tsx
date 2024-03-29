import React from "react";
import Text from "../../../components/text";
import WideCargoIcon from "../../../components/wideCargoIcon";

interface Props {
  label: string;
  value: string;
  showWideCargoIcon?: boolean;
}

const CargoDetailsItem: React.FC<Props> = ({
  label,
  value,
  showWideCargoIcon = false,
}) => {
  return (
    <div className="CargoDetailItem">
      <Text>
        {label}
      </Text>
      <Text weight="medium">{value}</Text>
      {showWideCargoIcon && <WideCargoIcon />}
    </div>
  );
};

export default CargoDetailsItem;
