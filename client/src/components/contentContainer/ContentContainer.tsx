import React from "react";
import "./ContentContainer.scss";

interface Props {
  children?: React.ReactNode;
}

export const ContentContainer: React.FC<Props> = ({ children }) => (
  <div className="ContentContainer">{children}</div>
);
