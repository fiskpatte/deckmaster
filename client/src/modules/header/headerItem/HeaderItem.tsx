import React from 'react';
import './HeaderItem.scss';

interface Props {
    children: React.ReactNode;
}

export const HeaderItem: React.FC<Props> = ({ children }) => {
    return (
        <div className="HeaderItem">
            {children}
        </div>
    )
}

export default HeaderItem;