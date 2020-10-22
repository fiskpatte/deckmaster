import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import usePrevious from "../../hooks/usePrevious";
import { setCurrentPlacement } from "../../store/deckMap/deckMapActions";
import { CargoPlacement, cargoPlacementFactory, Deck, MostForwardValidPlacementForLanes, ViewBoxDimensions } from "../../types/deckMap";
import { getMostForwardValidPlacementForLanes, getViewBoxOriginX, getViewBoxOriginY, getViewBoxSizeX, getViewBoxSizeY } from "./DeckMap.functions";

export const useResetCargoPlacement = (isOverview: boolean, cancelNextReset: boolean, cargoPlacement: CargoPlacement, deckId: string,) => {
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
}

export const useCalculateData = (deck: Deck, cargoPlacements: CargoPlacement[], cargoPlacement: CargoPlacement, bumperToBumperDistance: number, defaultVCG: number) => {
  const { updatingReplacingCargoPlacements, replacingCargoPlacements, notReplacingCargoPlacements } = useCalculateReplacingCargoPlacements(cargoPlacements);
  const { updatingViewBoxDimensions, viewBoxDimensions } = useCalculateViewBoxDimensions(deck);
  const { updatingMostForwardValidPlacementForLanes, mostForwardValidPlacementForLanes } = useCalculateMostForwardValidPlacementForLanes(deck, notReplacingCargoPlacements, cargoPlacement, bumperToBumperDistance, defaultVCG);
  const [updatingData, setupdatingData] = useState(true);

  useEffect(() => {
    if (updatingReplacingCargoPlacements || updatingViewBoxDimensions || updatingMostForwardValidPlacementForLanes) {
      setupdatingData(true);
    } else {
      setupdatingData(false);
    }
  }, [updatingReplacingCargoPlacements, updatingViewBoxDimensions, updatingMostForwardValidPlacementForLanes]);

  return { updatingData, viewBoxDimensions, mostForwardValidPlacementForLanes, replacingCargoPlacements, notReplacingCargoPlacements }
}

const useCalculateReplacingCargoPlacements = (cargoPlacements: CargoPlacement[]) => {
  const [
    notReplacingCargoPlacements,
    setNotReplacingCargoPlacements,
  ] = useState<CargoPlacement[]>([]);
  const [replacingCargoPlacements, setReplacingCargoPlacements] = useState<
    CargoPlacement[]
  >([]);
  const [updating, setUpdating] = useState(true);

  useEffect(() => {
    setUpdating(true);
    const notReplacingCargoPlacements =
      cargoPlacements.filter((cp) => !cp.replacing) ?? [];
    const replacingCargoPlacements =
      cargoPlacements.filter((cp) => cp.replacing) ?? [];
    setNotReplacingCargoPlacements(notReplacingCargoPlacements);
    setReplacingCargoPlacements(replacingCargoPlacements);
    setUpdating(false);
  }, [cargoPlacements]);
  return { updatingReplacingCargoPlacements: updating, replacingCargoPlacements, notReplacingCargoPlacements }
}

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
  return { updatingViewBoxDimensions: updating, viewBoxDimensions }
}

const useCalculateMostForwardValidPlacementForLanes = (deck: Deck, notReplacingCargoPlacements: CargoPlacement[], cargoPlacement: CargoPlacement, bumperToBumperDistance: number, defaultVCG: number) => {
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
  return { updatingMostForwardValidPlacementForLanes: updating, mostForwardValidPlacementForLanes: mostForwardValidPlacementForLanes ?? {} }
}