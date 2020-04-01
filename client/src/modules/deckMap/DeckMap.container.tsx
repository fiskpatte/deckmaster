import React, { useEffect } from "react";
import "./DeckMap.scss";
import { CargoDetails } from "./CargoDetails";
import { DeckSelector } from "./DeckSelector";
import DeckMap from "./DeckMap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import ConfirmButton from "./ConfirmButton";
import { setDeckMap, setCurrentDeck } from "./../../store/actions/appActions";
import {
  setCurrentCargo,
  setCurrentPlacement
} from "./../../store/actions/cargoActions";
import { getMockCargo } from "../../api/endpoints";

export const DeckMapContainer: React.FC = () => {
  const { currentDeck, deckMap } = useSelector(
    (state: RootState) => state.appReducer
  );
  const { currentCargo, currentPlacement } = useSelector(
    (state: RootState) => state.cargoReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPlacement(null));
  }, [dispatch, currentDeck]);

  const onConfirm = () => {
    let newCargo = { ...currentCargo, ...currentPlacement };
    deckMap[currentDeck.name].lanes
      .find(l => l.id === currentPlacement?.laneID)
      ?.cargo.push(newCargo);
    dispatch(setDeckMap(deckMap));
    dispatch(setCurrentDeck(deckMap[currentDeck.name]));
    dispatch(setCurrentPlacement(null));
    getMockCargo().then(cargo => {
      dispatch(setCurrentCargo(cargo));
    });
  };

  return (
    <div className="DeckMap">
      <div className="Header">
        <CargoDetails currentCargo={currentCargo} />
        <DeckSelector deckMap={deckMap} currentDeck={currentDeck} />
      </div>
      <DeckMap
        currentCargo={currentCargo}
        currentDeck={currentDeck}
        currentPlacement={currentPlacement}
      />
      <div className="Footer">
        {currentPlacement ? (
          <ConfirmButton onClick={() => onConfirm()} />
        ) : null}
      </div>
    </div>
  );
};

export default DeckMapContainer;
