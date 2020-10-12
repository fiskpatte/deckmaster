import React from "react";
import { ReactComponent as CloseMenuIcon } from "../../../assets/icons/closeMenuIcon.svg";
import { motion } from "framer-motion";
import { NavItem } from "./navItem";
import NavItemLogout from "./navItem/NavItemLogout";
import { SideBarProps } from "./types";
import { HeaderItem } from "../headerItem";
import variables from "./SideBar.scss";
import Text from "../../../components/text";

const SideBar: React.FC<SideBarProps> = ({ sideBarOpen, closeSideBar }) => {
  const hiddenWidth = -1 * variables.sideBarWidth.slice(0, -4);

  const variants = {
    visible: { left: "0px", transition: { ease: "linear", duration: 0.14 } },
    hidden: {
      left: `${hiddenWidth}vmax`,
      transition: { ease: "linear", duration: 0.14 }
    }
  };

  return (
    <motion.div
      className="SideBar"
      initial={"hidden"}
      animate={sideBarOpen ? "visible" : "hidden"}
      variants={variants}
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
    </motion.div>
  );
};

export default SideBar;
