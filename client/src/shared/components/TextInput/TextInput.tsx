import React from "react";
import "./TextInput.scss";

interface Props {
  children?: React.ReactNode;
  placeholder?: string;
}

export const Paper: React.FC<Props> = ({ children }) => (
  <div className="Paper">{children}</div>
);

export default Paper;
