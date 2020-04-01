import React from "react";
import "./Button.scss";

interface Props {
  label: string;
  onClick: () => void;
  type: "positive" | "danger" | "navigation" | "neutral";
}

export const Button: React.FC<Props> = ({ label, onClick, type }) => (
  <button className={`Button ${type}`} onClick={onClick}>
    {label}
  </button>
);

export default Button;
