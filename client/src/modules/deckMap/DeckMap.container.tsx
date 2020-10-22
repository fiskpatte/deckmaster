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
  getFrameIdFromPosition,
  getLaneNameFromPlacement,
  getVisibleCargoPlacements,
} from "../../store/deckMap/deckMapSelectors";
import { useHistory } from "react-router-dom";
import {
  getDeckSelectorData,
  cargoPlacementIsEmpty,
  cargoIsEmpty,
  placementsAreDifferent,
  getForwardPosition,
} from "./DeckMap.functions";
import { routes } from "./../../routes";
import { CargoPlacement, cargoPlacementFactory } from "../../types/deckMap";
import { Loader } from "../../components/loader";

import { useCalculateData, useResetCargoPlacement } from "./DeckMap.hooks";
import ButtonContainer from "./buttonContainer";
import PlaceCargoInfo from "./placeCargoInfo";
import useToast from "../../hooks/useToast";

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

  const toast = useToast();
  const currentDeck = useSelector(getCurrentDeck);
  const visibleCargoPlacements = useSelector(getVisibleCargoPlacements);
  const dispatch = useDispatch();
  const history = useHistory();
  const [confirming, setConfirming] = useState(false);
  const [discharging, setDischarging] = useState(false);
  const currentLaneName = useSelector(getLaneNameFromPlacement(currentCargoPlacement));
  const frameId = useSelector(getFrameIdFromPosition(currentCargoPlacement?.deckId, getForwardPosition(currentCargoPlacement)));
  const [cancelResetCargoPlacement, setCancelResetCargoPlacement] = useState(false);

  useResetCargoPlacement(
    isOverview,
    cancelResetCargoPlacement,
    currentCargoPlacement,
    currentDeck?.name
  );
  const {
    updatingData,
    viewBoxDimensions,
    mostForwardValidPlacementForLanes,
    replacingCargoPlacements,
    notReplacingCargoPlacements,
  } = useCalculateData(
    currentDeck,
    visibleCargoPlacements,
    currentCargoPlacement,
    bumperToBumperDistance,
    defaultVCG
  );

  useEffect(() => {
    if (!isOverview && cargoIsEmpty(currentCargoPlacement.cargo)) {
      history.push(routes.PlaceCargo.path);
    }
  }, [history, currentCargoPlacement.cargo, isOverview]);

  const startOverButtonClick = () => {
    if (!isOverview) {
      let resetPlacement = cargoPlacementFactory();
      resetPlacement.cargo = currentCargoPlacement.cargo;
      dispatch(setCurrentPlacement(resetPlacement));
    } else {
      dispatch(setCurrentPlacement({ ...initialCargoPlacement }));
    }
  };

  const cancelButtonClick = () => {
    history.push(routes.PlaceCargo.path);
  };

  const dischargeButtonClick = async () => {
    setDischarging(true);
    try {
      await updateExistingPlacement({ discharged: true });
    } catch (error) {
      toast.error("Failed to discharge cargo");
    }
    setDischarging(false);
  };

  const replaceButtonClick = async () => {
    try {
      await updateExistingPlacement({ replacing: true });
    } catch (error) {
      toast.error("Failed to move cargo to shifting area");
    }
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
        toast.error("Failed to place cargo");
      }
    }
    setConfirming(false);
  };

  const shouldUpdateExistingPlacement = () => {
    return (
      isOverview ||
      cargoPlacements.some(
        (cp) => cp.cargo.id === currentCargoPlacement.cargo.id
      )
    );
  };

  const updateExistingPlacement = async ({
    replacing = false,
    discharged = false,
  }) => {
    try {
      //This dispatch removes blinking in the client
      if (currentCargoPlacement.id === "") {
        currentCargoPlacement.id =
          cargoPlacements.find(
            (cp) => cp.cargo.id === currentCargoPlacement.cargo.id
          )?.id ?? "";
      }
      const newCargoPlacement = {
        ...currentCargoPlacement,
        deckId: currentDeck.name,
        replacing: replacing,
        discharged: discharged,
      }
      dispatch(addCargoPlacement(newCargoPlacement));
      await updateCargoPlacement({ ...newCargoPlacement, cargo: currentCargoPlacement.cargo.id, });
      dispatch(setCurrentPlacement(cargoPlacementFactory()));
    } catch (error) {
      toast.error("Failed to update cargo position");
    }
  };

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

  const showStartOverButton = () => {
    if (currentCargoPlacement.laneId === "") return false;

    return placementsAreDifferent(currentCargoPlacement, initialCargoPlacement);
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

  const onDeckSelect = (name: string) => {
    if (name !== currentDeck.name) {
      dispatch(setCurrentDeckId(name));
    }
  };

  const onSuccessfulCargoSearch = (cargoPlacement: CargoPlacement) => {
    setCancelResetCargoPlacement(!cancelResetCargoPlacement);
    setInitialCargoPlacement(cargoPlacement);
    dispatch(setCurrentDeckId(cargoPlacement.deckId));
    dispatch(setCurrentPlacement(cargoPlacement));
  }

  if (!currentDeck) return null;

  if (updatingData) return <Loader />;

  return (
    <div className="DeckMap">
      <div className="DeckMapHeader">
        <CargoDetails
          cargoPlacement={currentCargoPlacement}
          deck={currentDeck}
          searchEnabled={isOverview}
          cargoPlacements={cargoPlacements}
          onSuccessfulCargoSearch={onSuccessfulCargoSearch}
        />
        <PlaceCargoInfo
          lane={currentLaneName}
          frameId={frameId}
          isOverview={isOverview}
          startOverButtonClick={startOverButtonClick}
          showStartOverButton={showStartOverButton()}
        />
        <DeckSelector
          deckSelectorData={getDeckSelectorData(deckMap)}
          currentDeckName={currentDeck.name}
          setCurrentDeck={onDeckSelect}
        />
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
          replaceButtonClick={replaceButtonClick}
        />
      </div>
      <ButtonContainer
        isOverview={isOverview}
        showConfirmButton={showConfirmButton()}
        showDischargeButton={showDischargeButton()}
        onConfirm={onConfirm}
        confirming={confirming}
        dischargeButtonClick={dischargeButtonClick}
        discharging={discharging}
        cancelButtonClick={cancelButtonClick}
      />
    </div>
  );
};

export default DeckMapContainer;
