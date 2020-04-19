import React, { useState } from 'react';
import { ReactComponent as NotificationsIcon } from '../../../assets/icons/notificationsIcon.svg';
import './NotificationsButton.scss';
import { Popup } from '../../../components/popup';
import Text from '../../../components/text';
import variables from './NotificationsButton.scss';
import { Overlay } from '../../../components/overlay';

export const NotificationsButton: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const togglePopupVisible = () => setIsPopupVisible(!isPopupVisible);
  return (
    <>
      <div className="NotificationsButton" onClick={togglePopupVisible}>
        <NotificationsIcon />
        <Popup visible={isPopupVisible} >
          <Text value="Place KDC 118 on Main Deck" />
        </Popup>
      </div>
      <Overlay
        visible={isPopupVisible}
        transparent={true}
        onClick={togglePopupVisible}
        animate={false}
        zIndex={variables.popupOverlayZIndex}
      />
    </>
  )
}

export default NotificationsButton;