import React, { useEffect } from "react";
import "./DeckMap.scss";
import { CargoDetails } from "./cargoDetails";
import { DeckSelector } from "./deckSelector";
import DeckMap from "./DeckMap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { ConfirmButton } from "./confirmButton";
import {
  setCurrentPlacement,
  setCurrentCargo,
} from "../../store/deckMap/deckMapActions";
import { placeCargo } from "../../api/cargoPlacement";
import { getCurrentDeck } from "../../store/app/appSelectors";
import { useHistory } from "react-router-dom";
import { getDeckNames } from "./DeckMap.functions";
import { routes } from "./../../routes";
import { cargoFactory } from "../../types/deckMap";

interface Props {
  isOverview: boolean;
}

export const DeckMapContainer: React.FC<Props> = ({ isOverview = false }) => {
  const { deckMap, currentCargo, currentPlacement } = useSelector(
    (state: RootState) => state.deckMapReducer
  );

  console.log(isOverview);

  const currentDeck = useSelector(getCurrentDeck);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(setCurrentPlacement(null));
    return () => {
      dispatch(setCurrentCargo(cargoFactory()));
    };
  }, [dispatch, currentDeck, history]);

  // useEffect(() => {

  // }, []);

  useEffect(() => {
    if (
      history.location.pathname.includes(routes.PlaceCargo.path) &&
      !currentCargo?.id
    ) {
      history.push(routes.PlaceCargo.path);
    }
  }, [history, currentCargo]);

  const onConfirm = async () => {
    // set loader
    try {
      const result: any = await placeCargo({
        ...currentPlacement,
        deckId: currentDeck.name,
        cargo: currentCargo.id,
      });
      if (!result) {
        throw new Error("Couldn't place cargo");
      }

      history.push("/placecargo");
    } catch (error) {
      // Handle somehow
      console.error(error);
    }
  };

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
        currentCargo={currentCargo}
        deck={currentDeck}
        currentPlacement={currentPlacement}
      />
      <div className="DeckMapFooter">
        {currentPlacement && <ConfirmButton onClick={() => onConfirm()} />}
      </div>
    </div>
  );
};

export default DeckMapContainer;
