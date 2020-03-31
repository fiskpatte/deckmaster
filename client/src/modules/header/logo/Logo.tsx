import React from 'react';
import { ReactComponent as DeckmasterLogo } from '../../../assets/icons/deckmasterLogo.svg';
import './Logo.scss';

export const Logo: React.FC = () => {
    return (
        <div className="Logo">
            <DeckmasterLogo />
        </div>
    )
}

export default Logo;