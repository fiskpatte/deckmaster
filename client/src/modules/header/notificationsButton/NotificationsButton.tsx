import React, { useState, useRef, useEffect } from "react";
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
  const [blink, setBlink] = useState(false);
  const togglePopupVisible = () => setIsPopupVisible(!isPopupVisible);
  const dispatch = useDispatch();
  const history = useHistory();
  const { cargoQueue } = useSelector(
    (state: RootState) => state.cargoQueueReducer
  );
  const prevQueueLengthRef = useRef(cargoQueue.length);
  useEffect(() => {
    if (cargoQueue.length > prevQueueLengthRef.current) {
      setBlink(true);
      setTimeout(() => setBlink(false), 1000);
    }
    prevQueueLengthRef.current = cargoQueue.length;
  }, [cargoQueue.length])

  const onCargoQueueItemClick = (cargo: Cargo) => {
    dispatch(setCurrentCargo(cargo));
    history.push(routes.PlaceCargoConfirm.path);
  };
  return (
    <>
      <div className="NotificationsContainer" onClick={togglePopupVisible}>
        <NotificationsIcon />
        {cargoQueue.length > 0 && <div className={`Badge ${blink ? "blink" : ""}`}>{cargoQueue.length}</div>}
        <Popup visible={isPopupVisible}>
          {cargoQueue.length > 0 ?
            <div className="CargoQueueList">
              {cargoQueue.map((cargoQueueItem) =>
                <div
                  className="CargoQueueItem"
                  key={cargoQueueItem.id}
                  onClick={() => onCargoQueueItemClick(cargoQueueItem.cargo)}
                >
                  <Text
                    value={`Place ${cargoQueueItem.registrationNumber} on ${cargoQueueItem.deckId}`}
                  />
                </div>
              )}
            </div> :
            <Text value={"No notifications"} />
          }
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
