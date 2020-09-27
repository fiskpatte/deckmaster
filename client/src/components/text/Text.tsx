import React from "react";
import "./Text.scss";

interface Props {
  value: string;
  weight?: "light" | "standard" | "medium" | "bold";
  size?: "small" | "standard" | "medium" | "big";
  color?: "white" | "standard" | "red" | "blue" | "green";
  className?: string;
}

export const Text: React.FC<Props> = ({
  value,
  weight = "standard",
  size = "standard",
  color = "standard",
  className = "",
}) => (
  <div
    className={`Text weight-${weight} text-size-${size} color-${color} ${className}`}
  >
    {value}
  </div>
);

export default Text;
