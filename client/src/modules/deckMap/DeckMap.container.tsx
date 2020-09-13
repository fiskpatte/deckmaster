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
} from "../../store/deckMap/deckMapActions";
import { placeCargo, updateCargoPlacement } from "../../api/cargoPlacement";
import { getCurrentDeck, getCargoPlacementsForDeck } from "../../store/deckMap/deckMapSelectors";
import { useHistory } from "react-router-dom";
import {
  getDeckNames,
  placementsHaveDifferentPositions,
  cargoPlacementIsEmpty,
  cargoIsEmpty,
} from "./DeckMap.functions";
import { routes } from "./../../routes";
import { cargoPlacementFactory } from "../../types/deckMap";
import Button from "../../components/button";
// import { Loader } from "../../components/loader";
import usePrevious from './../../hooks/usePrevious';

interface Props {
  isOverview: boolean;
}

export const DeckMapContainer: React.FC<Props> = ({ isOverview = false }) => {
  const {
    deckMap,
    currentCargoPlacement,
  } = useSelector((state: RootState) => state.deckMapReducer);
  const { bumperToBumperDistance, defaultVCG } = useSelector(
    (state: RootState) => state.appReducer.settings
  );
  const [initialCargoPlacement, setInitialCargoPlacement] = useState(
    cargoPlacementFactory()
  );

  const currentDeck = useSelector(getCurrentDeck);
  const cargoPlacementsForDeck = useSelector(getCargoPlacementsForDeck);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [discharging, setDischarging] = useState(false);
  const previousDeckId = usePrevious(currentDeck?.name);

  useEffect(() => {
    let resetPlacement = cargoPlacementFactory();
    resetPlacement.cargo = currentCargoPlacement.cargo;
    if (previousDeckId && previousDeckId !== currentDeck?.name) {
      dispatch(setCurrentPlacement(isOverview ? cargoPlacementFactory() : resetPlacement));
    }
  }, [dispatch, isOverview, currentDeck, previousDeckId, currentCargoPlacement.cargo]);

  useEffect(() => {
    if (isOverview) {
      dispatch(setCurrentPlacement(cargoPlacementFactory()));
    }
  }, [dispatch, isOverview]);

  useEffect(() => {
    if (!isOverview && cargoIsEmpty(currentCargoPlacement.cargo)) {
      history.push(routes.PlaceCargo.path);
    }
  }, [history, currentCargoPlacement.cargo, isOverview]);

  const onConfirm = async () => {
    // set loader
    setLoading(true);
    if (updateExistingPlacement()) {
      try {
        await updateCargoPlacement({
          ...currentCargoPlacement,
          deckId: currentDeck.name,
          cargo: currentCargoPlacement.cargo.id
        });
      } catch (error) {
        console.error(error);
      }

      dispatch(setCurrentPlacement(cargoPlacementFactory()));
      setLoading(false);
      return;
    }

    try {
      await placeCargo({
        ...currentCargoPlacement,
        deckId: currentDeck.name,
        cargo: currentCargoPlacement.cargo.id
      });

      history.push(routes.PlaceCargo.path);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const undoButtonClick = () => {
    if (isOverview) {
      dispatch(setCurrentPlacement({ ...initialCargoPlacement }));
    } else {
      dispatch(setCurrentPlacement(cargoPlacementFactory()));
    }
  };

  const dischargeButtonClick = async () => {
    // anropa server, sätt den till discharged.
    try {
      setDischarging(true);
      await updateCargoPlacement({
        ...currentCargoPlacement,
        deckId: currentDeck.name,
        cargo: currentCargoPlacement.cargo.id,
        discharged: true
      });
      dispatch(setCurrentPlacement(cargoPlacementFactory()));
    } catch (error) {
      console.error(error);
    }
    setDischarging(false);
    return;
  };

  const updateExistingPlacement = () => {
    return isOverview;
  };

  const showConfirmButton = () => {
    if (currentCargoPlacement.laneId === "") return false;
    if (isOverview) {
      return placementsHaveDifferentPositions(
        currentCargoPlacement,
        initialCargoPlacement
      );
    }
    return true;
  };

  const showUndoButton = () => {
    if (currentCargoPlacement.laneId === "") return false;

    return placementsHaveDifferentPositions(
      currentCargoPlacement,
      initialCargoPlacement
    );
  };

  const showDischargeButton = () => {
    if (cargoPlacementIsEmpty(currentCargoPlacement) || !isOverview) return false;

    return !placementsHaveDifferentPositions(
      currentCargoPlacement,
      initialCargoPlacement
    );
  };

  if (!currentDeck) return null;
  return (
    <div className="DeckMap">
      <div className="DeckMapHeader">
        <CargoDetails cargo={currentCargoPlacement.cargo} />

        <DeckSelector
          deckNames={getDeckNames(deckMap)}
          currentDeckName={currentDeck.name}
        />
      </div>
      <DeckMap
        currentCargoPlacement={currentCargoPlacement}
        deck={currentDeck}
        isOverview={isOverview}
        setInitialCargoPlacement={setInitialCargoPlacement}
        cargoPlacements={cargoPlacementsForDeck}
        bumperToBumperDistance={bumperToBumperDistance}
        defaultVCG={defaultVCG}
      />
      {showDischargeButton() ? (
        <div className="DeckMapFooterDischarge">
          <div></div>
          <Button
            onClick={dischargeButtonClick}
            type="warning"
            label="DISCHARGE"
            loading={discharging}
            isDischarge={true}
          />
        </div>
      ) : (
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
          </div>
        )}
    </div>
  );
};

export default DeckMapContainer;
