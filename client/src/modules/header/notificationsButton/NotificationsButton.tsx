import React from 'react';
import { ReactComponent as NotificationsIcon } from '../../../assets/icons/notificationsIcon.svg';
import './NotificationsButton.scss';

export const NotificationsButton: React.FC = () => {
    return (
        <div className="NotificationsButton">
            <NotificationsIcon />
        </div>
    )
}

export default NotificationsButton;