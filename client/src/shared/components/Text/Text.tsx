import React from "react";
import "./Text.scss";

interface Props {
  value: string;
  type: "header1" | "header2" | "header3";
}

export const Text: React.FC<Props> = ({ value, type }) => (
  <div className={`Text ${type}`}>{value}</div>
);

export default Text;
