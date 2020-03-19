export interface SideBarProps {
    sideBarOpen: boolean,
    closeSideBar: () => void
}

export interface NavItemProps {
    path: string,
    label: string
}