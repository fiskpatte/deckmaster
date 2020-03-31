import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItemProps } from './types';
import './NavItem.scss';

export const NavItem: React.FC<NavItemProps> = ({ label, path }) => {
    return (
        <NavLink to={path} >
            <div className="NavItem">
                {label}
            </div>
        </NavLink>
    );
};

export default NavItem;