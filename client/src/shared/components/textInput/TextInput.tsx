import React from "react";
import "./TextInput.scss";

interface Props {
  placeholder?: string;
  value: string;
  onChange: (e: any) => void;
}

export const TextInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder
}) => (
  <input
    type="text"
    className="TextInput"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default TextInput;
