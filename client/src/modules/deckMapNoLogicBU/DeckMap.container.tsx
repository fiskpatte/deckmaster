import React, { useEffect } from "react";
import "./DeckMap.scss";
import { CargoDetails } from "./cargoDetails";
import { DeckSelector } from "./deckSelector";
import DeckMap from "./DeckMap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { getCurrentDeck } from "../../store/app/appSelectors";
import { getDeckNames } from "./DeckMap.functions";
import { useHistory } from "react-router-dom";
import { setCurrentPlacement, setCurrentCargo } from "../../store/deckMap/deckMapActions";
import { cargoFactory } from "../../types/deckMap";
import { routes } from "../../routes";
import { placementFactory } from './../../types/util';

interface Props {
  isEditable?: boolean;
}

export const DeckMapContainer: React.FC<Props> = ({ isEditable = false }) => {
  const { deckMap, currentCargo } = useSelector(
    (state: RootState) => state.deckMapReducer
  );
  const currentDeck = useSelector(getCurrentDeck);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(setCurrentPlacement(placementFactory()));
    return () => {
      dispatch(setCurrentCargo(cargoFactory()));
    };
  }, [dispatch, currentDeck, history]);

  useEffect(() => {
    if (
      history.location.pathname.includes(routes.PlaceCargo.path) &&
      !currentCargo?.id
    ) {
      history.push(routes.PlaceCargo.path);
    }
  }, [history, currentCargo]);

  return (
    <div className="DeckMap">
      <div className="DeckMapHeader">
        <CargoDetails cargo={currentCargo} />

        <DeckSelector
          deckNames={getDeckNames(deckMap)}
          currentDeckName={currentDeck.name}
        />
      </div>
      <DeckMap
        deck={currentDeck}
        isEditable={isEditable}
      />
      <div className="DeckMapFooter">
      </div>
    </div>
  );
};

export default DeckMapContainer;
