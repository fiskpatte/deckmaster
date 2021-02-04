import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import usePrevious from "../../hooks/usePrevious";
import { setCurrentPlacement } from "../../store/deckMap/deckMapActions";
import {
  CargoPlacement,
  cargoPlacementFactory,
  CargoPlacementsForLanes,
  Deck,
  ValidPlacementIntervalsForLanes,
  ViewBoxDimensions,
} from "../../types/deckMap";
import {
  getValidPlacementIntervals,
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
  bumperToBumperDistance: number
) => {
  const {
    updatingViewBoxDimensions,
    viewBoxDimensions,
  } = useCalculateViewBoxDimensions(deck);
  const {
    updatingDataForLanes,
    validPlacementIntervalsForLanes,
  } = useCalculateDataForLanes(
    deck,
    notReplacingCargoPlacements,
    bumperToBumperDistance
  );

  const [updatingData, setupdatingData] = useState(true);

  useEffect(() => {
    if (updatingViewBoxDimensions || updatingDataForLanes) {
      setupdatingData(true);
    } else {
      setupdatingData(false);
    }
  }, [updatingViewBoxDimensions, updatingDataForLanes]);

  return {
    updatingData,
    viewBoxDimensions,
    validPlacementIntervalsForLanes,
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

const useCalculateDataForLanes = (
  deck: Deck,
  notReplacingCargoPlacements: CargoPlacement[],
  bumperToBumperDistance: number
) => {
  const [
    validPlacementIntervalsForLanes,
    setValidPlacementIntervalsForLanes,
  ] = useState<ValidPlacementIntervalsForLanes>();

  const [updating, setUpdating] = useState(true);

  useEffect(() => {
    console.log("CALCULATING DATA FOR LANES");
    if (deck) {
      setUpdating(true);
      let cargoPlacements = {} as CargoPlacementsForLanes;
      let adjacentCargoPlacements = {} as CargoPlacementsForLanes;
      let validPlacementIntervals = {} as ValidPlacementIntervalsForLanes;
      for (let lane of deck.lanes) {
        cargoPlacements[lane.id] = notReplacingCargoPlacements
          .filter(
            (cp) => cp.laneId === lane.id || cp.overflowingLaneId === lane.id
          )
          .sort((a, b) => a.LCG - b.LCG);
        adjacentCargoPlacements[
          lane.id
        ] = notReplacingCargoPlacements
          .filter((cp) => lane.adjacentLanes.some((al) => al.id === cp.laneId))
          .sort((a, b) => a.LCG - b.LCG);

        validPlacementIntervals[lane.id] = getValidPlacementIntervals(
          lane,
          cargoPlacements[lane.id],
          adjacentCargoPlacements[lane.id],
          bumperToBumperDistance
        );
      }
      setValidPlacementIntervalsForLanes(validPlacementIntervals);
      setUpdating(false);
    }
  }, [deck, notReplacingCargoPlacements, bumperToBumperDistance]);
  return {
    updatingDataForLanes: updating,
    validPlacementIntervalsForLanes: validPlacementIntervalsForLanes ?? {},
  };
};
