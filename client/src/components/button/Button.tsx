import React from "react";
import "./Button.scss";

interface Props {
  className?: string;
  label: string;
  onClick: () => void;
  type?: "positive" | "danger" | "navigation" | "neutral";
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  label,
  onClick,
  type = "",
  className = "",
  disabled,
}) => (
  <button
    className={`Button ${type} ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

export default Button;
