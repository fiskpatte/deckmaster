import React from "react";
import "./Button.scss";

interface Props {
  className?: string;
  label: string;
  onClick: () => void;
  type?: "positive" | "danger" | "navigation" | "neutral";
}

export const Button: React.FC<Props> = ({ label, onClick, type = "", className = "" }) => (
  <button className={`Button ${type} ${className}`} onClick={onClick}>
    {label}
  </button>
);

export default Button;
