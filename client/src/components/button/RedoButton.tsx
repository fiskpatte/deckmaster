import React from "react";
import Button, { ButtonProps } from "./Button";
import { BsArrowCounterclockwise } from "react-icons/bs";

export const RedoButton: React.FC<ButtonProps> = ({
  color = "gray",
  label = "START OVER",
  size = "small",
  ...props
}) => (
  <Button
    rightIcon={<BsArrowCounterclockwise />}
    {...props}
    color={color}
    label={label}
    size={size}
  />
);

export default RedoButton;
