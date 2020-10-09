import React from "react";
import ConfirmButton from "../../../components/button/ConfirmButton";
import DischargeButton from "../../../components/button/DischargeButton";
import CancelButton from "../../../components/button/CancelButton";

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
        <div></div>
        {showConfirmButton ? (
          <ConfirmButton onClick={onConfirm} loading={confirming} />
        ) : (
          <div></div>
        )}
        {showDischargeButton ? (
          <DischargeButton
            onClick={dischargeButtonClick}
            loading={discharging}
          />
        ) : (
          <div></div>
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
          <div></div>
        )}
        <div></div>
      </div>
    );
  }
};

export default ButtonContainer;
