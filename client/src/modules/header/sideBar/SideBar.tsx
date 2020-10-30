import React from "react";
import { ReactComponent as CloseMenuIcon } from "../../../assets/icons/closeMenuIcon.svg";
import { NavItem } from "./navItem";
import NavItemLogout from "./navItem/NavItemLogout";
import { SideBarProps } from "./types";
import { HeaderItem } from "../headerItem";
import Text from "../../../components/text";
import { routes } from "../../../routes";

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
        <NavItem path={routes.PlaceCargo.path} label="Place cargo" />
        <NavItem path={routes.DeckOverview.path} label="Move cargo" />
        {/* <NavItem path="/discharge" label="Discharge" /> */}
        <NavItem path={routes.History.path} label="History" />
        <NavItem path={routes.Settings.path} label="Settings" />
        <NavItemLogout path={routes.Login.path} label="Logout" />
      </nav>
    </div>
  );
};

export default SideBar;
