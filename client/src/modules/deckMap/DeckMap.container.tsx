import React, { useEffect, useState } from "react";
import "./DeckMap.scss";
import { CargoDetails } from "./cargoDetails";
import { DeckSelector } from "./deckSelector";
import DeckMap from "./DeckMap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  addCargoPlacement,
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
  cargoPlacementIsEmpty,
  cargoIsEmpty,
  placementsAreDifferent
} from "./DeckMap.functions";
import { routes } from "./../../routes";
import { cargoPlacementFactory } from "../../types/deckMap";
import Button from "../../components/button";
import { Loader } from "../../components/loader";
import Text from "../../components/text";
import CancelButton from "../../components/button/CancelButton";
import DischargeButton from "../../components/button/DischargeButton";
import RedoButton from "../../components/button/RedoButton";
import ConfirmButton from "../../components/button/ConfirmButton";
import { useCalculateData, useResetCargoPlacement } from "./DeckMap.hooks";

interface Props {
  isOverview: boolean;
}

export const DeckMapContainer: React.FC<Props> = ({ isOverview = false }) => {
  const { deckMap, currentCargoPlacement, cargoPlacements } = useSelector(
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
  const [confirming, setConfirming] = useState(false);
  const [discharging, setDischarging] = useState(false);
  const [replacing, setReplacing] = useState(false);
  const [isSearchingCargo, setIsSearchingCargo] = useState(false);
  const [showCargoNotFound, setShowCargoNotFound] = useState(false);
  useResetCargoPlacement(isOverview, isSearchingCargo, currentCargoPlacement, currentDeck?.name);
  const {
    updatingData,
    viewBoxDimensions,
    mostForwardValidPlacementForLanes,
    replacingCargoPlacements,
    notReplacingCargoPlacements
  } = useCalculateData(currentDeck, visibleCargoPlacements, currentCargoPlacement, bumperToBumperDistance, defaultVCG)

  useEffect(() => {
    if (
      !isOverview &&
      cargoIsEmpty(currentCargoPlacement.cargo)
    ) {
      history.push(routes.PlaceCargo.path);
    }
  }, [history, currentCargoPlacement.cargo, isOverview]);

  const startOverButtonClick = () => {
    if (!isOverview) {
      let resetPlacement = cargoPlacementFactory();
      resetPlacement.cargo = currentCargoPlacement.cargo;
      dispatch(
        setCurrentPlacement(resetPlacement)
      );
    } else {
      dispatch(setCurrentPlacement({ ...initialCargoPlacement }));
    }
  };

  const cancelButtonClick = () => {
    history.push(routes.PlaceCargo.path);
  };

  const dischargeButtonClick = async () => {
    setDischarging(true);
    await updateExistingPlacement({ discharged: true })
    setDischarging(false);
  };

  const replaceButtonClick = async () => {
    setReplacing(true);
    await updateExistingPlacement({ replacing: true });
    setReplacing(false);
  };

  const onConfirm = async () => {
    setConfirming(true);
    if (shouldUpdateExistingPlacement()) {
      await updateExistingPlacement({});
    } else {
      try {
        await placeCargo({
          ...currentCargoPlacement,
          deckId: currentDeck.name,
          cargo: currentCargoPlacement.cargo.id,
        });
        history.push(routes.PlaceCargo.path);
      } catch (error) {
        console.error(error);
      }
    }
    setConfirming(false);
  };

  const shouldUpdateExistingPlacement = () => {
    return isOverview;
  };

  const updateExistingPlacement = async ({ replacing = false, discharged = false }) => {
    try {
      //This dispatch removes blinking in the client
      dispatch(addCargoPlacement(currentCargoPlacement))
      await updateCargoPlacement({
        ...currentCargoPlacement,
        deckId: currentDeck.name,
        cargo: currentCargoPlacement.cargo.id,
        replacing: replacing,
        discharged: discharged,
      });
      dispatch(setCurrentPlacement(cargoPlacementFactory()));
    } catch (error) {
      console.error(error);
    }
  }

  const showConfirmButton = () => {
    if (currentCargoPlacement.laneId === "") return false;
    if (isOverview) {
      return placementsAreDifferent(
        currentCargoPlacement,
        initialCargoPlacement
      );
    }
    return true;
  };

  const showCancelButton = () => !isOverview;

  const showStartOverButton = () => {
    if (currentCargoPlacement.laneId === "") return false;

    return placementsAreDifferent(
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

    return !placementsAreDifferent(
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

  const showReplaceButton = () => {
    if (
      cargoPlacementIsEmpty(currentCargoPlacement) ||
      !isOverview ||
      currentCargoPlacement.replacing
    )
      return false;

    return !placementsAreDifferent(
      currentCargoPlacement,
      initialCargoPlacement
    );
  };

  if (!currentDeck) return null;

  if (updatingData) return <Loader />;

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
          bumperToBumperDistance={bumperToBumperDistance}
          viewBoxDimensions={viewBoxDimensions}
          mostForwardValidPlacementForLanes={mostForwardValidPlacementForLanes}
          replacingCargoPlacements={replacingCargoPlacements}
          notReplacingCargoPlacements={notReplacingCargoPlacements}
        />
      </div>
      <div className="DeckMapFooter">
        {isOverview && showStartOverButton() && showConfirmButton() && (
          <div></div>
        )}
        {showCancelButton() && (
          <CancelButton
            onClick={cancelButtonClick}
          />
        )}
        {showDischargeButton() && (
          <DischargeButton
            onClick={dischargeButtonClick}
            loading={discharging}
          />
        )}
        {showReplaceButton() && (
          <Button
            onClick={replaceButtonClick}
            size="medium"
            color="gray"
            label="REPLACE"
            loading={replacing}
          />
        )}
        {showStartOverButton() && (
          <RedoButton
            onClick={startOverButtonClick}
          />
        )}
        {showConfirmButton() && (
          <ConfirmButton
            onClick={onConfirm}
            loading={confirming}
          />
        )}
      </div>
    </div>
  );
};

export default DeckMapContainer;
