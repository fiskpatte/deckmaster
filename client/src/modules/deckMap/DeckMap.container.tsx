import React, { useEffect, useState } from "react";
import "./DeckMap.scss";
import { CargoDetails } from "./cargoDetails";
import { DeckSelector } from "./deckSelector";
import DeckMap from "./DeckMap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
// import { ConfirmButton } from "./confirmButton";
import {
  setCurrentPlacement,
  setCurrentCargo
  // removeCargoPlacement,
} from "../../store/deckMap/deckMapActions";
import { placeCargo, updateCargoPlacement } from "../../api/cargoPlacement";
import { getCurrentDeck } from "../../store/deckMap/deckMapSelectors";
import { useHistory } from "react-router-dom";
import {
  getDeckNames,
  placementsHasDifferentPositions
} from "./DeckMap.functions";
import { routes } from "./../../routes";
import { cargoFactory, cargoPlacementFactory } from "../../types/deckMap";
import Button from "../../components/button";
// import { Loader } from "../../components/loader";

interface Props {
  isOverview: boolean;
}

export const DeckMapContainer: React.FC<Props> = ({ isOverview = false }) => {
  const {
    deckMap,
    currentCargo,
    currentPlacement,
    cargoPlacements
  } = useSelector((state: RootState) => state.deckMapReducer);

  const [initialCargoPlacement, setInitialCargoPlacement] = useState(
    cargoPlacementFactory()
  );

  const currentDeck = useSelector(getCurrentDeck);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    if (updateExistingPlacement()) {
      try {
        await updateCargoPlacement({
          ...currentPlacement,
          deckId: currentDeck.name,
          cargo: currentCargo.id
        });
        // dispatch(
        //   removeCargoPlacement(
        //     initialCargoPlacement.id,
        //     initialCargoPlacement.deckId,
        //     initialCargoPlacement.laneId
        //   )
        // );
      } catch (error) {
        console.error(error);
      }
      // Here socket updates
      console.log("updated...");

      // dispatch(
      //   removeCargoPlacement(
      //     initialCargoPlacement.id,
      //     initialCargoPlacement.deckId,
      //     initialCargoPlacement.laneId
      //   )
      // );

      dispatch(setCurrentPlacement(null));
      dispatch(setCurrentCargo(cargoFactory()));
      setLoading(false);
      return;
    }

    try {
      await placeCargo({
        ...currentPlacement,
        deckId: currentDeck.name,
        cargo: currentCargo.id
      });

      history.push("/placecargo");
    } catch (error) {
      // Handle somehow

      console.error(error);
    }
    setLoading(false);
  };

  const undoButtonClick = () => {
    if (isOverview) {
      dispatch(setCurrentPlacement({ ...initialCargoPlacement }));
    } else {
      dispatch(setCurrentPlacement(null));
    }
  };

  const dischargeButtonClick = async () => {
    // anropa server, sätt den till discharged.
    try {
      await updateCargoPlacement({
        ...currentPlacement,
        deckId: currentDeck.name,
        cargo: currentCargo.id,
        discharged: true
      });
    } catch (error) {
      console.error(error);
    }
    console.log("updated...");
    dispatch(setCurrentPlacement(null));
    dispatch(setCurrentCargo(cargoFactory()));
    return;
  };

  const updateExistingPlacement = () => {
    return isOverview;
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

  const showDischargeButton = () => {
    if (currentPlacement === null) {
      return false;
    }

    if (!isOverview) {
      return false;
    }

    return !placementsHasDifferentPositions(
      currentPlacement,
      initialCargoPlacement
    );
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
        isOverview={isOverview}
        setInitialCargoPlacement={setInitialCargoPlacement}
        cargoPlacements={cargoPlacements}
      />
      <div className="DeckMapFooter">
        {showUndoButton() && (
          <Button
            onClick={() => undoButtonClick()}
            type="neutral"
            label="UNDO"
          />
        )}
        {showConfirmButton() && (
          <Button
            type="positive"
            label="CONFIRM"
            onClick={() => onConfirm()}
            loading={loading}
          />
        )}
        {showDischargeButton() && (
          <Button
            onClick={dischargeButtonClick}
            type="warning"
            label="DISCHARGE"
          />
        )}
      </div>
    </div>
  );
};

export default DeckMapContainer;
