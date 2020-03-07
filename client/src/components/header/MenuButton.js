import React from 'react';
import { ReactComponent as MenuIcon } from '../../assets/icons/menuIcon.svg';

const MenuButton = ({ navMenuOpen, onClick }) => {

    return (
        <div className="HeaderItem MenuButton" onClick={onClick}>
            <MenuIcon />
        </div>
    )
}

export default MenuButton;