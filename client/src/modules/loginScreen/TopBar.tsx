import React from "react";
import { ReactComponent as DeckmasterLogo } from "../../assets/icons/deckmasterLogo.svg";
import "./LoginScreen.scss";
import Text from "../../components/text";
import { useSpring, animated } from "react-spring";

interface Props {
  text?: string;
  fadeOutLogoOnMount?: boolean;
}

export const TopBar: React.FC<Props> = ({
  text = "Enter credentials",
  fadeOutLogoOnMount = false,
}) => {
  const props = useSpring({
    opacity: 0,
    from: { opacity: 1 },
    // config: config.slow,
  });

  if (fadeOutLogoOnMount) {
    return (
      <div className="TopBar">
        <div>
          <Text size="medium" value={text} />
        </div>
        <div className="LogoContainer">
          <animated.div style={props}>
            <DeckmasterLogo />
          </animated.div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="TopBar">
        <div>
          <Text size="medium" value={text} />
        </div>
        <div className="LogoContainer">
          <DeckmasterLogo />
        </div>
      </div>
    );
  }
};

export default TopBar;
