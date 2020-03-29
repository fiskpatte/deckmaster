import React, { useEffect, useState } from 'react';
import './Header.scss'
import MenuButton from './components/MenuButton';
import ViewTitle from './components/ViewTitle';
import DetailsButton from './components/DetailsButton';
import NotificationsButton from './components/NotificationsButton';
import Logo from './components/Logo';
import { SideBarContainer } from './sideBar';
import { useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
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