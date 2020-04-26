import React from "react";
import "./TextInput.scss";

interface Props {
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
  type?: string;
  size?: "small" | "standard" | "big";
}

export const TextInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  type,
  size = "standard",
}) => (
  <input
    type={type || "text"}
    className={`TextInput textinput-size-${size}`}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default TextInput;
