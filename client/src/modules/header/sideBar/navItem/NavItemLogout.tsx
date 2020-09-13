import React from "react";
import { removeAllDefaultHeaders } from "../../../../functions/axios";
import { useHistory } from "react-router-dom";
import { NavItemProps } from "./types";
import Text from './../../../../components/text';
import { useDispatch } from 'react-redux';
import { setSessionData } from "../../../../store/app/appActions";

const NavItemLogout: React.FC<NavItemProps> = ({ label, path }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    removeAllDefaultHeaders();
    dispatch(setSessionData(undefined));
    history.push(path);
  };

  return (
    <div className="NavItem" onClick={logout}>
      <Text size="medium" weight="light" value={label} color="white" />
    </div>
  );
};

export default NavItemLogout;
