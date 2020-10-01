import React from "react";
import "./Button.scss";
import { FlexContainer } from "../flexContainer";
import ClipLoader from "react-spinners/ClipLoader";

export interface ButtonProps {
  className?: string;
  label?: string;
  onClick: () => void;
  color?:
  | "green"
  | "red"
  | "blue"
  | "gray"
  | "orange";
  size?: "small" | "standard" | "medium" | "big";
  disabled?: boolean;
  loading?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  label = "",
  onClick,
  color = "",
  className = "",
  disabled,
  size = "standard",
  loading = false,
  leftIcon,
  rightIcon
}) => (
    <button
      className={`Button color-${color} size-${size} ${className}`}
      onClick={loading ? () => null : onClick}
      disabled={disabled}
    >
      <FlexContainer
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
      >
        {loading ? (
          <ClipLoader size={30} color={"#ffffff"} loading={true} />
        ) : (
            <>
              {leftIcon ?? <div></div>}
              <div className="Label">{label}</div>
              {rightIcon ?? <div></div>}
            </>
          )}
      </FlexContainer>
    </button>
  );

export default Button;
