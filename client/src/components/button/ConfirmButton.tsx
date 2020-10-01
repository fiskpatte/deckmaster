import React from "react";
import Button, { ButtonProps } from "./Button";

export const ConfirmButton: React.FC<ButtonProps> = ({ color = "green", label = "CONFIRM", size = "medium", ...props }) => {
  return (
    <Button
      size={size}
      color={color}
      label={label}
      {...props}
    />
  );
};

export default ConfirmButton;
