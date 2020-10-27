import React, { useState } from 'react';
import { ReactComponent as DetailsIcon } from '../../../assets/icons/detailsIcon.svg';
import { Popup } from '../../../components/popup';
import './DetailsButton.scss';
import Text from "../../../components/text";
import { Overlay } from '../../../components/overlay';
import variables from "./DetailsButton.scss";

export const DetailsButton: React.FC = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const togglePopupVisible = () => setIsPopupVisible(!isPopupVisible);
    return (
        <>
            <div className="DetailsButton" onClick={togglePopupVisible}>
                <DetailsIcon />
                <Popup visible={isPopupVisible}>
                    <Text value={"Data not available"} />
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

export default DetailsButton;