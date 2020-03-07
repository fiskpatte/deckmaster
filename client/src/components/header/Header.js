import React, { useEffect, useState } from 'react';
import './Header.scss'
import MenuButton from './MenuButton';
import ViewTitle from './ViewTitle';
import DetailsButton from './DetailsButton';
import NotificationsButton from './NotificationsButton';
import Logo from './Logo';
import SideBar from './sideBar/SideBar';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const location = useLocation();
    const closeSideBar = () =>  setSideBarOpen(false);
    
    useEffect(() => {
        closeSideBar()
    }, [location])

    return (
        <>
            <div className="Header">
                <div style={{ display: "flex" }}>
                    <MenuButton onClick={() => setSideBarOpen(true)} />
                    <ViewTitle />
                </div>
                <div style={{ display: "flex" }}>
                    <DetailsButton />
                    <NotificationsButton />
                    <Logo />
                </div>
            </div>
            <SideBar sideBarOpen={sideBarOpen} closeSideBar={closeSideBar} />
        </>
    )
}

export default Header;