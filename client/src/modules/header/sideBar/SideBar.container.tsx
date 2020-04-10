import React from "react";
import { Overlay } from "../../../components/overlay";
import SideBar from "./SideBar";
import { SideBarProps } from "./types";
import variables from "./SideBar.scss";

export const SideBarContainer: React.FC<SideBarProps> = ({
  sideBarOpen,
  closeSideBar,
}) => {
  return (
    <>
      <Overlay
        visible={sideBarOpen}
        onClick={closeSideBar}
        zIndex={variables.sideBarOverlayZIndex}
      />
      <SideBar sideBarOpen={sideBarOpen} closeSideBar={closeSideBar} />
    </>
  );
};

export default SideBarContainer;
