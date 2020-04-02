import * as React from "react";
import Button from "./../../../shared/components/Button";
import "./ConfirmButton.scss";

interface Props {
  onClick: () => void;
}

export const ConfirmButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button
      className="ConfirmButton"
      type="positive"
      onClick={onClick}
      label="CONFIRM"
    />
  );
};

export default ConfirmButton;
