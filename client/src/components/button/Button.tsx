import React from "react";
import { BsSearch } from "react-icons/bs";
import "./Button.scss";
import { FlexContainer } from "../flexContainer";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  className?: string;
  label: string;
  onClick: () => void;
  type?:
    | "positive"
    | "danger"
    | "navigation"
    | "neutral"
    | "warning"
    | "search";
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
    <FlexContainer
      flexDirection="row"
      justifyContent="space-around"
      alignItems="center"
    >
      {loading ? (
        <ClipLoader size={30} color={"#ffffff"} loading={true} />
      ) : (
        label
      )}
      {type === "search" && <BsSearch />}
    </FlexContainer>
  </button>
);

export default Button;
