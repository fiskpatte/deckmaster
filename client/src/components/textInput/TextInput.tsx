import React from "react";
import "./TextInput.scss";

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
}) => {
  if (hasSubmit) {
    return (
      <form onSubmit={(e) => onSubmit(e)}>
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
        />
      </form>
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
