import React, { useEffect, useState } from 'react';
import './Header.scss'
import MenuButton from './MenuButton';
import ViewTitle from './ViewTitle';
import DetailsButton from './DetailsButton';
import NotificationsButton from './NotificationsButton';
import Logo from './Logo';
import SideBarContainer from './sideBar/SideBar.container';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const location = useLocation();
    const closeSideBar = () => setSideBarOpen(false);

    useEffect(() => {
        closeSideBar()
    }, [location])

    if (location.pathname.includes('login')) {
        return null;
    }

    return (
        <>
            <div className="Header">
                <div className="FlexContainer">
                    <MenuButton onClick={() => setSideBarOpen(true)} />
                    <ViewTitle />
                </div>
                <div className="FlexContainer">
                    <DetailsButton />
                    <NotificationsButton />
                    <Logo />
                </div>
            </div>
            <SideBarContainer sideBarOpen={sideBarOpen} closeSideBar={closeSideBar} />
        </>
    )
}

export default Header;