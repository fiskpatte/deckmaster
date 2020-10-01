import React from "react";
import "./Paper.scss";

export const Paper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = "", ...rest }) => (
  <div className={`Paper ${className}`} {...rest}>{children}</div>
);

export default Paper;
