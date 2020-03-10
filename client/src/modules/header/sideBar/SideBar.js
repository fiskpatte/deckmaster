import React from 'react';
import Overlay from '../../../shared/components/overlay/Overlay';
import './SideBar.scss';
import NavMenu from './NavMenu';

const SideBar = ({ sideBarOpen, closeSideBar }) => {

    return (
        <>
            <Overlay visible={sideBarOpen} />
            <NavMenu sideBarOpen={sideBarOpen} closeSideBar={closeSideBar} />
        </>
    );
}

export default SideBar;