import React, { useEffect, useState } from "react";
import "./Header.scss";
import { MenuButton } from "./menuButton";
import { ViewTitle } from "./viewTitle";
import { DetailsButton } from "./detailsButton";
import { NotificationsButton } from "./notificationsButton";
import { Logo } from "./logo";
import { SideBarContainer } from "./sideBar";
import { useLocation } from "react-router-dom";
import { HeaderItem } from "./headerItem";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";

export const Header: React.FC = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const location = useLocation();
  const closeSideBar = () => setSideBarOpen(false);
  const isLoggedIn = useIsLoggedIn();
  useEffect(() => {
    closeSideBar();
  }, [location]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <div className="Header">
        <div className="FlexContainer">
          <HeaderItem>
            <MenuButton onClick={() => setSideBarOpen(true)} />
          </HeaderItem>
          <HeaderItem>
            <ViewTitle />
          </HeaderItem>
        </div>
        <div className="FlexContainer">
          <HeaderItem>
            <DetailsButton />
          </HeaderItem>
          <HeaderItem>
            <NotificationsButton />
          </HeaderItem>
          <HeaderItem>
            <Logo />
          </HeaderItem>
        </div>
      </div>
      <SideBarContainer sideBarOpen={sideBarOpen} closeSideBar={closeSideBar} />
    </>
  );
};

export default Header;
