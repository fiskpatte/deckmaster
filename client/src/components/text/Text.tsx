import React from "react";
import "./Text.scss";

interface Props {
  value: string;
  weight?: "light" | "standard" | "medium" | "bold";
  size?: "small" | "standard" | "medium" | "big";
  className?: string;
}

export const Text: React.FC<Props> = ({
  value,
  weight = "standard",
  size = "standard",
  className = "",
}) => (
  <div className={`Text weight-${weight} size-${size} ${className}`}>
    {value}
  </div>
);

export default Text;
