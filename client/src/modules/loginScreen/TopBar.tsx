import React from "react";
import { ReactComponent as DeckmasterLogo } from "../../assets/icons/deckmasterLogo.svg";
import "./LoginScreen.scss";
import Text from "../../components/text";

export const TopBar = () => (
  <div className="TopBar">
    <div>
      <Text size="medium" value="Enter credentials" />
    </div>
    <div className="LogoContainer">
      <DeckmasterLogo />
    </div>
  </div>
);

export default TopBar;
