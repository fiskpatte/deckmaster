import React from "react";
import "./HeaderAvoider.scss";
interface Props {
  children?: React.ReactNode;
}
export const HeaderAvoider: React.FC<Props> = ({ children }) => (
  <div className="HeaderAvoider">{children}</div>
);
