import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItemProps } from './types';
import './NavItem.scss';
import Text from '../../../../components/text';

export const NavItem: React.FC<NavItemProps> = ({ label, path }) => {

  return (
    <NavLink to={path} className="NavItem">
      <Text size="medium" weight="light" value={label} color="white" />
    </NavLink>
  );
};

export default NavItem;