import { createSelector } from "reselect";
import { CargoState } from "../types";

const getCurrentDeckId = (state: { deckMapReducer: CargoState }) =>
  state.deckMapReducer.currentDeckId ?? "";

const getDeckMap = (state: { deckMapReducer: CargoState }) =>
  state.deckMapReducer.deckMap;

const getCargoPlacements = (state: { deckMapReducer: CargoState }) =>
  state.deckMapReducer.cargoPlacements;

export const getCurrentDeck = createSelector(
  [getCurrentDeckId, getDeckMap],
  (currentDeckId, deckMap) => deckMap[currentDeckId]
);

export const getCargoPlacementsForLane = (laneId: string) =>
  createSelector(getCargoPlacements, (cargoPlacements) =>
    cargoPlacements.filter((cp) => cp.laneId === laneId)
  );

export const getOverflowingCargoPlacementsIntoLane = (laneId: string) =>
  createSelector(getCargoPlacements, (cargoPlacements) =>
    cargoPlacements.filter((cp) => cp.overflowingLaneId === laneId)
  );
