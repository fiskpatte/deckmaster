import React from "react";
import { ReactComponent as CloseMenuIcon } from "../../../assets/icons/closeMenuIcon.svg";
import { NavItem } from "./navItem";
import NavItemLogout from "./navItem/NavItemLogout";
import { SideBarProps } from "./types";
import { HeaderItem } from "../headerItem";
import Text from "../../../components/text";

const SideBar: React.FC<SideBarProps> = ({ sideBarOpen, closeSideBar }) => {
  return (
    <div
      className={`SideBar ${sideBarOpen ? "open" : "closed"}`}
    >
      <div className="SideBarHeader">
        <HeaderItem>
          <Text size="big" weight="light" value="MENU" color="white" />
        </HeaderItem>
        <HeaderItem>
          <div className="CloseMenuButton" onClick={closeSideBar}>
            <CloseMenuIcon />
          </div>
        </HeaderItem>
      </div>
      <nav className="Body">
        <NavItem path="/placecargo" label="Place cargo" />
        <NavItem path="/overview" label="Move cargo" />
        {/* <NavItem path="/discharge" label="Discharge" /> */}
        <NavItem path="/history" label="History" />
        <NavItem path="/settings" label="Settings" />
        <NavItemLogout path="/login" label="Logout" />
      </nav>
    </div>
  );
};

export default SideBar;
