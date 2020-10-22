import React from "react";
import ConfirmButton from "../../../components/button/ConfirmButton";
import DischargeButton from "../../../components/button/DischargeButton";
import CancelButton from "../../../components/button/CancelButton";
import Button from "../../../components/button";

interface Props {
  isOverview: boolean;
  showConfirmButton: boolean;
  showDischargeButton: boolean;
  onConfirm: () => void;
  confirming: boolean;
  dischargeButtonClick: () => void;
  discharging: boolean;
  cancelButtonClick: () => void;
}

export const ButtonContainer: React.FC<Props> = ({
  isOverview,
  showConfirmButton,
  showDischargeButton,
  onConfirm,
  confirming,
  dischargeButtonClick,
  discharging,
  cancelButtonClick,
}) => {
  if (isOverview) {
    return (
      <div className="ButtonContainer">
        <InvisibleButton />
        {showConfirmButton ? (
          <ConfirmButton onClick={onConfirm} loading={confirming} />
        ) : (
          <InvisibleButton />
        )}
        {showDischargeButton ? (
          <DischargeButton
            onClick={dischargeButtonClick}
            loading={discharging}
          />
        ) : (
          <InvisibleButton />
        )}
      </div>
    );
  } else {
    return (
      <div className="ButtonContainer">
        <CancelButton onClick={cancelButtonClick} />
        {showConfirmButton ? (
          <ConfirmButton onClick={onConfirm} loading={confirming} />
        ) : (
          <InvisibleButton />
        )}
        <InvisibleButton />
      </div>
    );
  }
};

const InvisibleButton = () => (
  <Button invisible size="medium" onClick={() => null} label="Invisible" />
);

export default ButtonContainer;
