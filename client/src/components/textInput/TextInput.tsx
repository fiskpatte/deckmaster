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
  onSubmit?: () => void;
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
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type={type || "text"}
        className={`TextInput textinput-size-${size}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        autoFocus={autoFocus}
        onSubmit={onSubmit}
      />
    </form>
  );
};

export default TextInput;
