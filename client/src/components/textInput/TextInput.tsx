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

export const TextInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  type,
  size = "standard",
  id,
  autoFocus = false,
  onSubmit = () => null,
  hasSubmit = false,
  onOutsideClick = () => null
}) => {
  if (hasSubmit) {
    return (
      <OutsideAlerter outsideClickCallback={onOutsideClick}>
        <form onSubmit={e => onSubmit(e)}>
          <input
            type="submit"
            style={{ visibility: "hidden", position: "absolute" }}
          />
          <input
            type={type || "text"}
            className={`TextInput textinput-size-${size}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            id={id}
            autoFocus={autoFocus}
            onBlur={onOutsideClick}
          />
        </form>
      </OutsideAlerter>
    );
  }

  return (
    <input
      type={type || "text"}
      className={`TextInput textinput-size-${size}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      id={id}
      autoFocus={autoFocus}
    />
  );
};

export default TextInput;
