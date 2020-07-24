import React, { useEffect, useState } from "react";
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
import {
  getDeckNames,
  placementsHasDifferentPositions,
} from "./DeckMap.functions";
import { routes } from "./../../routes";
import { cargoFactory, cargoPlacementFactory } from "../../types/deckMap";
import Button from "../../components/button";

interface Props {
  isOverview: boolean;
}

export const DeckMapContainer: React.FC<Props> = ({ isOverview = false }) => {
  const { deckMap, currentCargo, currentPlacement } = useSelector(
    (state: RootState) => state.deckMapReducer
  );

  const [initialCargoPlacement, setInitialCargoPlacement] = useState(
    cargoPlacementFactory()
  );

  const currentDeck = useSelector(getCurrentDeck);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(setCurrentPlacement(null));
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

  const undoButtonClick = () => {
    if (isOverview) {
      dispatch(setCurrentPlacement({ ...initialCargoPlacement }));
    } else {
      dispatch(setCurrentPlacement(null));
    }
  };

  const showConfirmButton = () => {
    if (isOverview) {
      if (currentPlacement === null) {
        return false;
      }

      return placementsHasDifferentPositions(
        currentPlacement,
        initialCargoPlacement
      );
    } else {
      return !!currentPlacement;
    }
  };

  const showUndoButton = () => {
    if (currentPlacement === null) {
      return false;
    }

    return placementsHasDifferentPositions(
      currentPlacement,
      initialCargoPlacement
    );
  };

  const showDischargeButton = () => false;

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
        isOverview={isOverview}
        setInitialCargoPlacement={setInitialCargoPlacement}
      />
      <div className="DeckMapFooter">
        {showUndoButton() && (
          <Button
            onClick={() => undoButtonClick()}
            type="neutral"
            label="UNDO"
          />
        )}
        {showConfirmButton() && <ConfirmButton onClick={() => onConfirm()} />}
        {showDischargeButton() && (
          <Button
            onClick={() => onConfirm()}
            type="warning"
            label="DISCHARGE"
          />
        )}
      </div>
    </div>
  );
};

export default DeckMapContainer;
