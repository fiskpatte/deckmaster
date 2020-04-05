import React from "react";
import "./TextInput.scss";

interface Props {
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
  type?: string;
}

export const TextInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  type,
}) => (
  <input
    type={type || "text"}
    className="TextInput"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default TextInput;
