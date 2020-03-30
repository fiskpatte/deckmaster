import React from 'react';
import { ReactComponent as NotificationsIcon } from '../../../assets/icons/notificationsIcon.svg';

const NotificationsButton: React.FC = () => {
    return (
        <div className="HeaderItem NotificationsButton">
            <NotificationsIcon />
        </div>
    )
}

export default NotificationsButton;