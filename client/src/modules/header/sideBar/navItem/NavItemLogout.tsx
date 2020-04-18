import React from "react";
import { setAuthorizationToken } from "../../../../functions/axios";
import { useHistory } from "react-router-dom";
import { NavItemProps } from "./types";
import Text from './../../../../components/text';

const NavItemLogout: React.FC<NavItemProps> = ({ label, path }) => {
  const history = useHistory();

  const logout = () => {
    setAuthorizationToken(undefined);
    history.push(path);
  };

  return (
    <div className="NavItem" onClick={logout}>
      <Text size="medium" weight="light" value={label} color="white" />
    </div>
  );
};

export default NavItemLogout;
