import React from 'react';
import Overlay from '../../../shared/components/overlay/Overlay';
import SideBar from './SideBar';
import { SideBarProps } from './types';

const SideBarContainer: React.FC<SideBarProps> = ({ sideBarOpen, closeSideBar }) => {
    return (
        <>
            <Overlay visible={sideBarOpen} onClick={closeSideBar} />
            <SideBar sideBarOpen={sideBarOpen} closeSideBar={closeSideBar} />
        </>
    );
}

export default SideBarContainer;