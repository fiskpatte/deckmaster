import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ path, label }) => {
    return (
        <NavLink to={path} >
            <div className="NavItem">
                {label}
            </div>
        </NavLink>
    );
};

export default NavItem;