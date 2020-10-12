import React, { useRef } from "react";
import { useOutsideAlerter } from "./../../hooks/useOutsideAlerter";

interface Props {
  outsideClickCallback: () => void;
  children: React.ReactNode;
}
const OutsideAlerter: React.FC<Props> = ({ outsideClickCallback, children }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, outsideClickCallback);

  return (
    <div
      ref={wrapperRef}
    // style={{
    //   display: "inline-block",
    //   position: props.position || "static"
    // }}
    >
      {children}
    </div>
  );
}

export default OutsideAlerter;
