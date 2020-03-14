import React from 'react';
import { setAuthorizationToken } from '../../../shared/functions/axios';
import { useHistory } from 'react-router-dom';

const NavItemLogout = ({ label }) => {
    const history = useHistory();

    const logout = () => {
        setAuthorizationToken(null);
        history.push('/login')
    }
    
    return (
        <div className="NavItem" onClick={logout}>
            {label}
        </div>
    );
};

export default NavItemLogout;