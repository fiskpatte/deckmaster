import React from "react";
import "./TextInput.scss";
import OutsideAlerter from "../outsideAlerter/OutsideAlerter";
import { BsSearch } from "react-icons/bs";
import { FlexContainer } from "../flexContainer";

interface Props {
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
  type?: string;
  size?: "small" | "standard" | "big";
  id?: string;
  autoFocus?: boolean;
  onSubmit?: (e: any) => void;
  hasSubmit?: boolean;
  className?: string;
  isSearchInput?: boolean;
  onOutsideClick?: () => void;
}

export const TextInput: React.FC<Props & React.RefAttributes<HTMLInputElement>> = React.forwardRef<HTMLInputElement, Props>(({
  value,
  onChange,
  placeholder,
  type,
  size = "standard",
  id,
  autoFocus = false,
  onSubmit = () => null,
  onOutsideClick = () => null,
  className = "",
  isSearchInput = false,
  ...rest
}, ref) => {

  return (
    <OutsideAlerter outsideClickCallback={onOutsideClick}>
      <form onSubmit={e => onSubmit(e)}>
        <FlexContainer
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <input
            type={type || "text"}
            className={`TextInput size-${size} ${className}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            id={id}
            autoFocus={autoFocus}
            autoComplete="off"
            ref={ref}
            {...rest}
          />
          {isSearchInput && <BsSearch onClick={(e) => onSubmit(e)} />}
        </FlexContainer>
      </form>
    </OutsideAlerter>
  );
});

export default TextInput;
