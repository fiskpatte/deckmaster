import React, { useState } from "react";
import { ReactComponent as NotificationsIcon } from "../../../assets/icons/notificationsIcon.svg";
import "./NotificationsButton.scss";
import { Popup } from "../../../components/popup";
import Text from "../../../components/text";
import variables from "./NotificationsButton.scss";
import { Overlay } from "../../../components/overlay";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { setCurrentCargo } from "../../../store/deckMap/deckMapActions";
import { Cargo } from "../../../types/deckMap";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes";

export const NotificationsButton: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const togglePopupVisible = () => setIsPopupVisible(!isPopupVisible);
  const dispatch = useDispatch();
  const history = useHistory();
  const { cargoQueue } = useSelector(
    (state: RootState) => state.cargoQueueReducer
  );

  const onCargoQueueItemClick = (cargo: Cargo) => {
    dispatch(setCurrentCargo(cargo));
    history.push(routes.PlaceCargoConfirm.path);
  };
  return (
    <>
      <div className="NotificationsButton" onClick={togglePopupVisible}>
        <NotificationsIcon />
        <Popup visible={isPopupVisible}>
          {cargoQueue.length > 0 ? (
            cargoQueue.map((cargoQueueItem) => (
              <div
                key={cargoQueueItem.id}
                onClick={() => onCargoQueueItemClick(cargoQueueItem.cargo)}
              >
                <Text
                  value={`Place ${cargoQueueItem.registrationNumber} on ${cargoQueueItem.deckId}`}
                />
              </div>
            ))
          ) : (
            <Text value={"No notifications"} />
          )}
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
  );
};

export default NotificationsButton;
