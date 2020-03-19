import React from 'react';
import Overlay from '../../../shared/components/overlay/Overlay';
import SideBar from './SideBar';
import { SideBarProps } from './SideBar.types';
import variables from './SideBar.scss';

const SideBarContainer: React.FC<SideBarProps> = ({ sideBarOpen, closeSideBar }) => {
    return (
        <>
            <Overlay visible={sideBarOpen} onClick={closeSideBar} zIndex={variables.sideBarOverlayZIndex}/>
            <SideBar sideBarOpen={sideBarOpen} closeSideBar={closeSideBar} />
        </>
    );
}

export default SideBarContainer;