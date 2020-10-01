import React, { useEffect, useState } from "react";
import "./DeckMap.scss";
import { CargoDetails } from "./cargoDetails";
import { DeckSelector } from "./deckSelector";
import DeckMap from "./DeckMap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  setCurrentDeckId,
  setCurrentPlacement,
} from "../../store/deckMap/deckMapActions";
import { placeCargo, updateCargoPlacement } from "../../api/cargoPlacement";
import {
  getCurrentDeck,
  getVisibleCargoPlacements,
} from "../../store/deckMap/deckMapSelectors";
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
import usePrevious from "./../../hooks/usePrevious";
import Text from "../../components/text";
import CancelButton from "../../components/button/CancelButton";
import DischargeButton from "../../components/button/DischargeButton";
import RedoButton from "../../components/button/RedoButton";
import ConfirmButton from "../../components/button/ConfirmButton";

interface Props {
  isOverview: boolean;
}

export const DeckMapContainer: React.FC<Props> = ({ isOverview = false }) => {
  const { deckMap, currentCargoPlacement } = useSelector(
    (state: RootState) => state.deckMapReducer
  );
  const { bumperToBumperDistance, defaultVCG } = useSelector(
    (state: RootState) => state.appReducer.settings
  );
  const [initialCargoPlacement, setInitialCargoPlacement] = useState(
    cargoPlacementFactory()
  );

  const currentDeck = useSelector(getCurrentDeck);
  const visibleCargoPlacements = useSelector(getVisibleCargoPlacements);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [discharging, setDischarging] = useState(false);
  const previousDeckId = usePrevious(currentDeck?.name);
  const [isSearchingCargo, setIsSearchingCargo] = useState(false);
  const previousIsSearchingCargo = usePrevious(isSearchingCargo);
  const [showCargoNotFound, setShowCargoNotFound] = useState(false);
  const [showPageLoader, setShowPageLoader] = useState(false);

  const cargoPlacements = useSelector(
    (state: RootState) => state.deckMapReducer.cargoPlacements
  );

  useEffect(() => {
    let resetPlacement = cargoPlacementFactory();
    resetPlacement.cargo = currentCargoPlacement.cargo;
    if (
      previousDeckId &&
      previousDeckId !== currentDeck?.name &&
      !previousIsSearchingCargo
    ) {
      dispatch(
        setCurrentPlacement(
          isOverview ? cargoPlacementFactory() : resetPlacement
        )
      );
    }
  }, [
    dispatch,
    isOverview,
    currentDeck,
    previousDeckId,
    currentCargoPlacement.cargo,
    previousIsSearchingCargo,
  ]);

  useEffect(() => {
    if (isOverview) {
      dispatch(setCurrentPlacement(cargoPlacementFactory()));
    }
  }, [dispatch, isOverview]);

  useEffect(() => {
    if (
      !isOverview &&
      cargoIsEmpty(currentCargoPlacement.cargo)
    ) {
      history.push(routes.PlaceCargo.path);
    }
  }, [history, currentCargoPlacement.cargo, isOverview]);

  const onConfirm = async () => {
    setLoading(true);
    if (updateExistingPlacement()) {
      try {
        await updateCargoPlacement({
          ...currentCargoPlacement,
          deckId: currentDeck.name,
          cargo: currentCargoPlacement.cargo.id,
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
        cargo: currentCargoPlacement.cargo.id,
      });
      dispatch(setCurrentPlacement(cargoPlacementFactory()));
      history.push(routes.PlaceCargo.path);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const startOverButtonClick = () => {
    if (!isOverview) {
      dispatch(
        setCurrentPlacement({
          ...currentCargoPlacement,
          LCG: 0,
          TCG: 0,
          VCG: 0,
          laneId: "",
        })
      );
    } else {
      dispatch(setCurrentPlacement({ ...initialCargoPlacement }));
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
        discharged: true,
      });
      dispatch(setCurrentPlacement(cargoPlacementFactory()));
    } catch (error) {
      console.error(error);
    }
    setDischarging(false);
    return;
  };

  const cancelButtonClick = () => {
    dispatch(setCurrentPlacement(cargoPlacementFactory()));
    history.push(routes.PlaceCargo.path);
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

  const showCancelButton = () => !isOverview && !showPageLoader;

  const showStartOverButton = () => {
    if (currentCargoPlacement.laneId === "") return false;

    return placementsHaveDifferentPositions(
      currentCargoPlacement,
      initialCargoPlacement
    );
  };

  const showDischargeButton = () => {
    if (
      cargoPlacementIsEmpty(currentCargoPlacement) ||
      !isOverview ||
      currentCargoPlacement.replacing
    )
      return false;

    return !placementsHaveDifferentPositions(
      currentCargoPlacement,
      initialCargoPlacement
    );
  };

  const doSearch = (input: string) => {
    const result = cargoPlacements.find(
      (cp) =>
        cp.cargo.registrationNumber.toUpperCase().replace(/\s/g, "") ===
        input.toUpperCase().replace(/\s/g, "")
    );

    if (!result) {
      setShowCargoNotFound(true);
      return;
    }

    dispatch(setCurrentDeckId(result.deckId));
    dispatch(setCurrentPlacement(result));
    setInitialCargoPlacement(result);
    setIsSearchingCargo(false);
    return false;
  };

  const replaceButtonClick = async () => {
    try {
      setDischarging(true);
      await updateCargoPlacement({
        ...currentCargoPlacement,
        deckId: currentDeck.name,
        cargo: currentCargoPlacement.cargo.id,
        replacing: true,
      });
      dispatch(setCurrentPlacement(cargoPlacementFactory()));
    } catch (error) {
      console.error(error);
    }
    setDischarging(false);
    return;
  };

  const showReplaceButton = () => {
    if (
      cargoPlacementIsEmpty(currentCargoPlacement) ||
      !isOverview ||
      currentCargoPlacement.replacing
    )
      return false;

    return !placementsHaveDifferentPositions(
      currentCargoPlacement,
      initialCargoPlacement
    );
  };

  if (!currentDeck) return null;

  return (
    <div className="DeckMap">
      <div className="DeckMapHeader">
        <CargoDetails
          cargoPlacement={currentCargoPlacement}
          deck={currentDeck}
          doSearch={doSearch}
          searchIconClicked={() => setIsSearchingCargo(true)}
          isSearchingCargo={isSearchingCargo}
          searchIconEnabled={isOverview && !isSearchingCargo}
          showCargoNotFound={showCargoNotFound}
          resetShowCargoNotFound={() => setShowCargoNotFound(false)}
          onOutsideClick={() => setIsSearchingCargo(false)}
        />
        <DeckSelector
          deckNames={getDeckNames(deckMap)}
          currentDeckName={currentDeck.name}
        />
        {!isOverview && (
          <div className="placecargolabel">
            <Text value="Place the cargo" weight="bold" />
          </div>
        )}
      </div>
      <div className="DeckMapBody">
        <DeckMap
          currentCargoPlacement={currentCargoPlacement}
          deck={currentDeck}
          isOverview={isOverview}
          setInitialCargoPlacement={setInitialCargoPlacement}
          cargoPlacements={visibleCargoPlacements}
          bumperToBumperDistance={bumperToBumperDistance}
          defaultVCG={defaultVCG}
          setShowPageLoader={setShowPageLoader}
        />
      </div>
      <div className="DeckMapFooter">
        {isOverview && showStartOverButton() && showConfirmButton() && (
          <div></div>
        )}
        {showCancelButton() && (
          <CancelButton
            onClick={cancelButtonClick}
            loading={discharging}
          />
        )}
        {showDischargeButton() && (
          <DischargeButton
            onClick={dischargeButtonClick}
            loading={discharging}
          />
        )}
        {showReplaceButton() && (
          <Button onClick={replaceButtonClick} color="gray" label="REPLACE" />
        )}
        {showStartOverButton() && (
          <RedoButton
            onClick={startOverButtonClick}
          />
        )}
        {showConfirmButton() && (
          <ConfirmButton
            onClick={onConfirm}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default DeckMapContainer;
