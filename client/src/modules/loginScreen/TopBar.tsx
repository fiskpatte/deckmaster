import React from "react";
import { ReactComponent as DeckmasterLogo } from "../../assets/icons/deckmasterLogo.svg";
import "./LoginScreen.scss";
import Text from "../../shared/components/Text";

export const TopBar = () => (
  <div className="TopBar">
    <div>
      <Text type="header2" value="Enter credentials" />
    </div>
    <div className="LogoContainer">
      <DeckmasterLogo />
    </div>
  </div>
);

export default TopBar;
