import React from 'react';
import Button, { ButtonProps } from "./Button";
import { ImArrowLeft } from "react-icons/im";

export const DischargeButton: React.FC<ButtonProps> = ({ color = "orange", label = "CANCEL", size = "medium", ...props }) => (
  <Button
    leftIcon={<ImArrowLeft />}
    size={size}
    color={color}
    label={label}
    {...props}
  />
)

export default DischargeButton;