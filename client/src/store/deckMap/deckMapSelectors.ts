import { createSelector } from "reselect";
import { CargoPlacement } from "../../types/deckMap";
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

export const getCargoPlacementsForDeck = createSelector(
  [getCurrentDeckId, getCargoPlacements],
  (currentDeckId, cargoPlacements) =>
    cargoPlacements.filter((cp) => cp.deckId === currentDeckId)
);

export const getCargoPlacementsForLane = (laneId: string) =>
  createSelector(getCargoPlacements, (cargoPlacements) =>
    cargoPlacements.filter((cp) => cp.laneId === laneId)
  );

export const getOverflowingCargoPlacementsIntoLane = (laneId: string) =>
  createSelector(getCargoPlacements, (cargoPlacements) =>
    cargoPlacements.filter((cp) => cp.overflowingLaneId === laneId)
  );

export const getCargoPlacementByRegistrationNumber = (input: string) =>
  createSelector(getCargoPlacements, (cargoPlacements) =>
    cargoPlacements.find(
      (cp: CargoPlacement) =>
        cp.cargo.registrationNumber.replace(/\s/g, "") ===
        input.replace(/\s/g, "")
    )
  );
