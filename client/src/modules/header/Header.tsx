import React, { useEffect, useState } from "react";
import "./Header.scss";
import { MenuButton } from "./menuButton";
// import { ViewTitle } from "./viewTitle";
import { DetailsButton } from "./detailsButton";
import { NotificationsButton } from "./notificationsButton";
import { Logo } from "./logo";
import { SideBarContainer } from "./sideBar";
import { useLocation } from "react-router-dom";
import { HeaderItem } from "./headerItem";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { useSpring, animated, config } from "react-spring";

export const Header: React.FC = () => {
  console.log("render header");
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const location = useLocation();
  const closeSideBar = () => setSideBarOpen(false);
  const isLoggedIn = useIsLoggedIn();
  useEffect(() => {
    closeSideBar();
  }, [location]);

  const props = useSpring({
    marginTop: 0,
    from: { marginTop: -200 },
    config: config.slow,
  });

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <animated.div className="Header" style={props}>
        <div className="FlexContainer">
          <HeaderItem>
            <MenuButton onClick={() => setSideBarOpen(true)} />
          </HeaderItem>
          {/* <HeaderItem>
            <ViewTitle />
          </HeaderItem> */}
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
      </animated.div>
      <SideBarContainer sideBarOpen={sideBarOpen} closeSideBar={closeSideBar} />
    </>
  );
};

export default Header;
