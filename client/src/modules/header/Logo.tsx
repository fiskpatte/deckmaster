import React from 'react';
import { ReactComponent as DeckmasterLogo } from '../../assets/icons/deckmasterLogo.svg';

const Logo: React.FC = () => {
    return (
        <div className="HeaderItem Logo">
            <DeckmasterLogo />
        </div>
    )
}

export default Logo;