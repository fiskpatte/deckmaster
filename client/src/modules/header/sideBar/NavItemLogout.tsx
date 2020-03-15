import React from 'react';
import { setAuthorizationToken } from '../../../shared/functions/axios';
import { useHistory } from 'react-router-dom';
import { NavItemProps } from './types';

const NavItemLogout: React.FC<NavItemProps> = ({ label, path }) => {
    const history = useHistory();

    const logout = () => {
        setAuthorizationToken(undefined);
        history.push(path)
    }

    return (
        <div className="NavItem" onClick={logout}>
            {label}
        </div>
    );
};

export default NavItemLogout;