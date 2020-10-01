import React, { useRef } from "react";
import { useOutsideAlerter } from "./../../hooks/useOutsideAlerter";

function OutsideAlerter(props: any) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.outsideClickCallback);

  return (
    <div
      ref={wrapperRef}
    // style={{
    //   display: "inline-block",
    //   position: props.position || "static"
    // }}
    >
      {props.children}
    </div>
  );
}

export default OutsideAlerter;
