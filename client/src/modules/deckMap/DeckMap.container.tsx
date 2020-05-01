import React, { useEffect } from "react";
import "./DeckMap.scss";
import { CargoDetails } from "./cargoDetails";
import { DeckSelector } from "./deckSelector";
import DeckMap from "./DeckMap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { ConfirmButton } from "./confirmButton";
import { setCurrentPlacement } from "./../../store/actions/cargoActions";
import { placeCargo } from "../../api/endpoints";
import { getCurrentDeck } from "../../store/selectors/appSelectors";

export const DeckMapContainer: React.FC = () => {
  const { deckMap } = useSelector((state: RootState) => state.appReducer);
  const { currentCargo, currentPlacement } = useSelector(
    (state: RootState) => state.cargoReducer
  );

  const currentDeck = useSelector(getCurrentDeck);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPlacement(null));
  }, [dispatch, currentDeck]);

  const onConfirm = async () => {
    // deckMap[currentDeck.name].lanes
    //   .find((l) => l.id === currentPlacement?.laneId)
    //   ?.cargo.push(newCargoPlacement);

    //
    // set loader
    await placeCargo({
      ...currentCargo,
      ...currentPlacement,
      deckId: currentDeck.name,
    });

    // dispatch(setDeckMap(deckMap));
    // // dispatch(setCurrentDeckId(deckMap[currentDeck.name]));
    dispatch(setCurrentPlacement(null));
    // getMockCargo().then((cargo) => {
    //   dispatch(setCurrentCargo(cargo));
    // });
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
