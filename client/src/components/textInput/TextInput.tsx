import React from "react";
import "./TextInput.scss";
import OutsideAlerter from "../outsideAlerter/OutsideAlerter";

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
  ...rest
}, ref) => {

  return (
    <OutsideAlerter outsideClickCallback={onOutsideClick}>
      <form onSubmit={e => onSubmit(e)}>
        <input
          type={type || "text"}
          className={`TextInput size-${size}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          id={id}
          autoFocus={autoFocus}
          onBlur={onOutsideClick}
          autoComplete="off"
          ref={ref}
          {...rest}
        />
      </form>
    </OutsideAlerter>
  );
});

export default TextInput;
