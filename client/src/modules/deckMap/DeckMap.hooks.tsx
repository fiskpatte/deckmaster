import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import usePrevious from "../../hooks/usePrevious";
import { setCurrentPlacement } from "../../store/deckMap/deckMapActions";
import {
  CargoPlacement,
  cargoPlacementFactory,
  CargoPlacementsForLanes,
  Deck,
  MostForwardValidPlacementForLanes,
  ViewBoxDimensions,
} from "../../types/deckMap";
import {
  getMostForwardValidPlacementForLanes,
  getViewBoxOriginX,
  getViewBoxOriginY,
  getViewBoxSizeX,
  getViewBoxSizeY,
} from "./DeckMap.functions";

export const useResetCargoPlacement = (
  isOverview: boolean,
  cancelNextReset: boolean,
  cargoPlacement: CargoPlacement,
  deckId: string
) => {
  const dispatch = useDispatch();
  const previousDeckId = usePrevious(deckId);
  const previousCancelNextReset = usePrevious(cancelNextReset);

  //Reset when changing deck, but not if cancelNextReset is toggled.
  useEffect(() => {
    let resetPlacement = cargoPlacementFactory();
    resetPlacement.cargo = cargoPlacement.cargo;
    if (
      previousDeckId &&
      previousDeckId !== deckId &&
      previousCancelNextReset === cancelNextReset
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
    deckId,
    previousDeckId,
    cargoPlacement.cargo,
    cancelNextReset,
    previousCancelNextReset,
  ]);

  //Reset first time mounting overview
  useEffect(() => {
    if (isOverview) {
      dispatch(setCurrentPlacement(cargoPlacementFactory()));
    }
  }, [dispatch, isOverview]);
};

export const useCalculateData = (
  deck: Deck,
  notReplacingCargoPlacements: CargoPlacement[],
  cargoPlacement: CargoPlacement,
  bumperToBumperDistance: number,
  defaultVCG: number
) => {
  const {
    updatingViewBoxDimensions,
    viewBoxDimensions,
  } = useCalculateViewBoxDimensions(deck);
  const {
    updatingMostForwardValidPlacementForLanes,
    mostForwardValidPlacementForLanes,
  } = useCalculateMostForwardValidPlacementForLanes(
    deck,
    notReplacingCargoPlacements,
    cargoPlacement,
    bumperToBumperDistance,
    defaultVCG
  );
  const {
    updatingCargoPlacementsForLanes,
    cargoPlacementsForLanes,
    adjacentCargoPlacementsForLanes,
  } = useCalculateCargoPlacementsForLanes(deck, notReplacingCargoPlacements);

  const [updatingData, setupdatingData] = useState(true);

  useEffect(() => {
    if (
      updatingViewBoxDimensions ||
      updatingMostForwardValidPlacementForLanes ||
      updatingCargoPlacementsForLanes
    ) {
      setupdatingData(true);
    } else {
      setupdatingData(false);
    }
  }, [
    updatingViewBoxDimensions,
    updatingMostForwardValidPlacementForLanes,
    updatingCargoPlacementsForLanes,
  ]);

  return {
    updatingData,
    viewBoxDimensions,
    mostForwardValidPlacementForLanes,
    cargoPlacementsForLanes,
    adjacentCargoPlacementsForLanes,
  };
};

const useCalculateViewBoxDimensions = (deck: Deck) => {
  const [viewBoxDimensions, setViewBoxDimensions] = useState<
    ViewBoxDimensions
  >();
  const [updating, setUpdating] = useState(true);

  useEffect(() => {
    if (deck) {
      setUpdating(true);
      setViewBoxDimensions({
        sizeX: getViewBoxSizeX(deck),
        sizeY: getViewBoxSizeY(deck),
        originX: getViewBoxOriginX(deck),
        originY: getViewBoxOriginY(deck),
      });
      setUpdating(false);
    }
  }, [deck]);
  return { updatingViewBoxDimensions: updating, viewBoxDimensions };
};

const useCalculateMostForwardValidPlacementForLanes = (
  deck: Deck,
  notReplacingCargoPlacements: CargoPlacement[],
  cargoPlacement: CargoPlacement,
  bumperToBumperDistance: number,
  defaultVCG: number
) => {
  const [
    mostForwardValidPlacementForLanes,
    setMostForwardValidPlacementForLanes,
  ] = useState<MostForwardValidPlacementForLanes>();
  const [updating, setUpdating] = useState(true);
  useEffect(() => {
    if (deck) {
      setUpdating(true);
      setMostForwardValidPlacementForLanes(
        getMostForwardValidPlacementForLanes(
          deck.lanes,
          notReplacingCargoPlacements,
          cargoPlacement.cargo,
          bumperToBumperDistance,
          defaultVCG
        )
      );
      setUpdating(false);
    }
  }, [
    deck,
    notReplacingCargoPlacements,
    cargoPlacement,
    bumperToBumperDistance,
    defaultVCG,
  ]);
  return {
    updatingMostForwardValidPlacementForLanes: updating,
    mostForwardValidPlacementForLanes: mostForwardValidPlacementForLanes ?? {},
  };
};

const useCalculateCargoPlacementsForLanes = (
  deck: Deck,
  notReplacingCargoPlacements: CargoPlacement[]
) => {
  const [cargoPlacementsForLanes, setCargoPlacementsForLanes] = useState<
    CargoPlacementsForLanes
  >();
  const [
    adjacentCargoPlacementsForLanes,
    setAdjacentCargoPlacementsForLanes,
  ] = useState<CargoPlacementsForLanes>();
  const [updating, setUpdating] = useState(true);
  useEffect(() => {
    if (deck) {
      setUpdating(true);
      let cargoPlacements = {} as CargoPlacementsForLanes;
      let adjacentCargoPlacements = {} as CargoPlacementsForLanes;
      for (let lane of deck.lanes) {
        cargoPlacements[lane.id] = notReplacingCargoPlacements.filter(
          (cp) => cp.laneId === lane.id || cp.overflowingLaneId === lane.id
        );
        adjacentCargoPlacements[
          lane.id
        ] = notReplacingCargoPlacements.filter((cp) =>
          lane.adjacentLanes.some((al) => al.id === cp.laneId)
        );
      }
      setCargoPlacementsForLanes(cargoPlacements);
      setAdjacentCargoPlacementsForLanes(adjacentCargoPlacements);
      setUpdating(false);
    }
  }, [deck, notReplacingCargoPlacements]);
  return {
    updatingCargoPlacementsForLanes: updating,
    cargoPlacementsForLanes: cargoPlacementsForLanes ?? {},
    adjacentCargoPlacementsForLanes: adjacentCargoPlacementsForLanes ?? {},
  };
};
