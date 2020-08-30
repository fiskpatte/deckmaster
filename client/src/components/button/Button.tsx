import React from "react";
import "./Button.scss";

interface Props {
  className?: string;
  label: string;
  onClick: () => void;
  type?: "positive" | "danger" | "navigation" | "neutral" | "warning";
  size?: "small" | "standard" | "medium" | "big";
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<Props> = ({
  label,
  onClick,
  type = "",
  className = "",
  disabled,
  size = "standard",
  loading = false
}) => (
  <button
    className={`Button type-${type} size-${size} ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {loading ? "Processing..." : label}
  </button>
);

export default Button;
