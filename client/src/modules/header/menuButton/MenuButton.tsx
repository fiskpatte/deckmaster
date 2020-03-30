import React from 'react';
import { ReactComponent as MenuIcon } from '../../../assets/icons/menuIcon.svg';
import './MenuButton.scss';

interface Props {
    onClick: () => void
}

export const MenuButton: React.FC<Props> = ({ onClick }) => {
    return (
        <div className="MenuButton" onClick={onClick}>
            <MenuIcon />
        </div>
    )
}

export default MenuButton;