import React from 'react';
import { ReactComponent as MenuIcon } from '../../assets/icons/menuIcon.svg';

interface Props {
    onClick: () => void
}
const MenuButton: React.FC<Props> = ({ onClick }) => {
    return (
        <div className="HeaderItem MenuButton" onClick={onClick}>
            <MenuIcon />
        </div>
    )
}

export default MenuButton;