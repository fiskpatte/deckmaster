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
  setSuggestedCargoPlacement,
} from "../../store/deckMap/deckMapActions";
import { placeCargo, updateCargoPlacement } from "../../api/cargoPlacement";
import {
  getCurrentDeck,
  getFrameIdFromPosition,
  getLaneNameFromPlacement,
  getPlacingLane,
  getReplacingCargoPlacements,
  getVisibleNotReplacingCargoPlacements,
} from "../../store/deckMap/deckMapSelectors";
import { useHistory } from "react-router-dom";
import {
  getDeckSelectorData,
  cargoPlacementIsEmpty,
  cargoIsEmpty,
  placementsAreDifferent,
  getForwardPosition,
  isValidPlacement,
  getPlacementFromValidIntervalsForLanePlacement,
} from "./DeckMap.functions";
import { routes } from "./../../routes";
import {
  CargoPlacement,
  cargoPlacementFactory,
  laneFactory,
} from "../../types/deckMap";
import { Loader } from "../../components/loader";

import { useCalculateData, useResetCargoPlacement } from "./DeckMap.hooks";
import ButtonContainer from "./buttonContainer";
// import PlaceCargoInfo from "./placeCargoInfo";
import useToast from "../../hooks/useToast";
import HeaderAvoider from "../../components/headerAvoider";

interface Props {
  isOverview: boolean;
}

export const DeckMapContainer: React.FC<Props> = ({ isOverview = false }) => {
  const {
    deckMap,
    currentCargoPlacement,
    cargoPlacements,
    suggestedCargoPlacement,
  } = useSelector((state: RootState) => state.deckMapReducer);
  const [
    suggestedCargoPlacementMocked,
    setSuggestedCargoPlacementMocked,
  ] = useState(false);
  const { bumperToBumperDistance, defaultVCG } = useSelector(
    (state: RootState) => state.appReducer.settings
  );
  const [initialCargoPlacement, setInitialCargoPlacement] = useState(
    cargoPlacementFactory()
  );

  const toast = useToast();
  const currentDeck = useSelector(getCurrentDeck);
  const replacingCargoPlacements = useSelector(getReplacingCargoPlacements);
  const placingLane = useSelector(getPlacingLane);
  const notReplacingCargoPlacements = useSelector(
    getVisibleNotReplacingCargoPlacements
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [confirming, setConfirming] = useState(false);
  const [discharging, setDischarging] = useState(false);
  const currentLaneName = useSelector(
    getLaneNameFromPlacement(currentCargoPlacement)
  );
  const frameId = useSelector(
    getFrameIdFromPosition(
      currentCargoPlacement?.deckId,
      getForwardPosition(currentCargoPlacement)
    )
  );
  const [cancelResetCargoPlacement, setCancelResetCargoPlacement] = useState(
    false
  );

  useResetCargoPlacement(
    isOverview,
    cancelResetCargoPlacement,
    currentCargoPlacement,
    currentDeck?.name
  );
  const {
    updatingData,
    viewBoxDimensions,
    validPlacementIntervalsForLanes,
  } = useCalculateData(
    currentDeck,
    notReplacingCargoPlacements,
    bumperToBumperDistance
  );

  //This is only temporary until we get correct data from the backend for the suggestedCargoPlacement
  useEffect(() => {
    if (
      suggestedCargoPlacement &&
      !suggestedCargoPlacementMocked &&
      Object.keys(validPlacementIntervalsForLanes).length > 0 &&
      !isOverview
    ) {
      const { lanes } = deckMap[suggestedCargoPlacement.deckId];
      const { cargo } = currentCargoPlacement;
      let randomLane = laneFactory();
      let cargoPlacement = cargoPlacementFactory();
      let i = 0;
      do {
        if (i > 20) {
          setSuggestedCargoPlacementMocked(false);
          dispatch(setSuggestedCargoPlacement(undefined));
          return;
        }
        randomLane = lanes[Math.floor(Math.random() * lanes.length)];
        cargoPlacement = getPlacementFromValidIntervalsForLanePlacement(
          validPlacementIntervalsForLanes[randomLane.id],
          cargo,
          randomLane,
          defaultVCG
        );
        cargoPlacement.LCG -= cargo.length / 2;
        i++;
      } while (!isValidPlacement(cargoPlacement));

      let smartSuggestedCargoPlacement = {
        ...suggestedCargoPlacement,
        laneId: randomLane.id,
        LCG: cargoPlacement.LCG,
        TCG: cargoPlacement.TCG,
      };
      //
      let newPlacement = {
        ...cargoPlacement,
        deckId: suggestedCargoPlacement.deckId,
      };
      setInitialCargoPlacement(newPlacement);
      setSuggestedCargoPlacementMocked(true);
      dispatch(setSuggestedCargoPlacement(smartSuggestedCargoPlacement));
      dispatch(setCurrentDeckId(suggestedCargoPlacement.deckId));
      dispatch(setCurrentPlacement(newPlacement));
    } else if (isOverview) {
      dispatch(setSuggestedCargoPlacement(undefined));
      setSuggestedCargoPlacementMocked(false);
    }
  }, [
    suggestedCargoPlacement,
    isOverview,
    currentDeck,
    defaultVCG,
    currentCargoPlacement,
    dispatch,
    deckMap,
    cargoPlacements,
    validPlacementIntervalsForLanes,
    suggestedCargoPlacementMocked,
    bumperToBumperDistance,
  ]);

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
        dispatch(setSuggestedCargoPlacement(undefined));
        setSuggestedCargoPlacementMocked(false);
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
      };
      dispatch(addCargoPlacement(newCargoPlacement));
      await updateCargoPlacement({
        ...newCargoPlacement,
        cargo: currentCargoPlacement.cargo.id,
      });
      dispatch(setCurrentPlacement(cargoPlacementFactory()));
    } catch (error) {
      toast.error("Failed to update cargo position");
    }
  };

  const showConfirmButton = () => {
    if (!isValidPlacement(currentCargoPlacement)) return false;
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
  };

  if (!currentDeck) return null;

  if (updatingData) return <Loader />;

  return (
    <HeaderAvoider>
      <div className="DeckMap">
        <div className="DeckMapHeader">
          <CargoDetails
            cargoPlacement={currentCargoPlacement}
            deck={currentDeck}
            searchEnabled={isOverview}
            cargoPlacements={cargoPlacements}
            onSuccessfulCargoSearch={onSuccessfulCargoSearch}
            lane={currentLaneName}
            frameId={frameId}
            startOverButtonClick={startOverButtonClick}
            showStartOverButton={showStartOverButton()}
          />
          {/* <PlaceCargoInfo
          lane={currentLaneName}
          frameId={frameId}
          isOverview={isOverview}
          startOverButtonClick={startOverButtonClick}
          showStartOverButton={showStartOverButton()}
        /> */}
          <DeckSelector
            deckSelectorData={getDeckSelectorData(deckMap)}
            currentDeckName={currentDeck.name}
            setCurrentDeck={onDeckSelect}
            suggestedDeckId={suggestedCargoPlacement?.deckId}
          />
        </div>
        <div className="DeckMapBody">
          <DeckMap
            currentCargoPlacement={currentCargoPlacement}
            deck={currentDeck}
            isOverview={isOverview}
            setInitialCargoPlacement={setInitialCargoPlacement}
            viewBoxDimensions={viewBoxDimensions}
            validPlacementIntervalsForLanes={validPlacementIntervalsForLanes}
            replacingCargoPlacements={replacingCargoPlacements}
            notReplacingCargoPlacements={notReplacingCargoPlacements}
            replaceButtonClick={replaceButtonClick}
            placingLane={placingLane}
            suggestedCargoPlacement={suggestedCargoPlacement}
            defaultVCG={defaultVCG}
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
    </HeaderAvoider>
  );
};

export default DeckMapContainer;
