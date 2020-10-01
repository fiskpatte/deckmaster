import React from 'react';
import Button, { ButtonProps } from "./Button";
import { ImArrowRight } from "react-icons/im";

export const DischargeButton: React.FC<ButtonProps> = ({ color = "orange", label = "DISCHARGE", size = "medium", ...props }) => (
  <Button
    rightIcon={<ImArrowRight />}
    {...props}
    color={color}
    label={label}
    size={size}
  />
)

export default DischargeButton;