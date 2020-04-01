import React from "react";
import { ReactComponent as DeckmasterLogo } from "../../assets/icons/deckmasterLogo.svg";
import "./LoginScreen.scss";

export const TopBar = () => (
  <div className="TopBar">
    <div></div>
    <div className="LogoContainer">
      <DeckmasterLogo />
    </div>
  </div>
);

export default TopBar;
