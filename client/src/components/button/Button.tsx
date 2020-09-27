import React from "react";
import { BsSearch, BsArrowCounterclockwise } from "react-icons/bs";
import { ImArrowRight, ImArrowLeft } from "react-icons/im";
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
  isDischarge?: boolean;
  isSearch?: boolean;
  isStartOver?: boolean;
  isCancelPlacement?: boolean;
}

export const Button: React.FC<Props> = ({
  label,
  onClick,
  type = "",
  className = "",
  disabled,
  size = "standard",
  loading = false,
  isDischarge = false,
  isSearch = false,
  isStartOver = false,
  isCancelPlacement = false
}) => (
  <button
    className={`Button type-${type} size-${size} ${className}`}
    onClick={loading ? () => null : onClick}
    disabled={disabled}
  >
    <FlexContainer
      flexDirection="row"
      justifyContent="space-around"
      alignItems="center"
    >
      {isCancelPlacement && <ImArrowLeft />}
      {loading ? (
        <ClipLoader size={30} color={"#ffffff"} loading={true} />
      ) : (
        label
      )}
      {isSearch && !loading && <BsSearch />}
      {isDischarge && !loading && <ImArrowRight />}
      {isStartOver && !loading && <BsArrowCounterclockwise />}
    </FlexContainer>
  </button>
);

export default Button;
