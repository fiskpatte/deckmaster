import { createSelector } from "reselect";
import { CargoPlacement, laneFactory } from "../../types/deckMap";
import { CargoState } from "../types";

const getCurrentDeckId = (state: { deckMapReducer: CargoState }) =>
  state.deckMapReducer.currentDeckId ?? "";

const getDeckMap = (state: { deckMapReducer: CargoState }) =>
  state.deckMapReducer.deckMap;

const getCurrentCargoPlacement = (state: { deckMapReducer: CargoState }) =>
  state.deckMapReducer.currentCargoPlacement;

const getCurrentCargoId = (state: { deckMapReducer: CargoState }) =>
  state.deckMapReducer.currentCargoPlacement.cargo.id;

const getCargoPlacements = (state: { deckMapReducer: CargoState }) =>
  state.deckMapReducer.cargoPlacements;

export const getCurrentDeck = createSelector(
  [getCurrentDeckId, getDeckMap],
  (currentDeckId, deckMap) => deckMap[currentDeckId]
);

export const getReplacingCargoPlacements = createSelector(
  [getCargoPlacements],
  (cargoPlacements) => cargoPlacements.filter((cp) => cp.replacing)
);

export const getVisibleNotReplacingCargoPlacements = createSelector(
  [getCurrentDeckId, getCargoPlacements, getCurrentCargoId],
  (currentDeckId, cargoPlacements, currentCargoId) =>
    cargoPlacements.filter(
      (cp) =>
        cp.deckId === currentDeckId &&
        !cp.replacing &&
        cp.cargo.id !== currentCargoId
    )
);

export const getPlacingLane = createSelector(
  [getDeckMap, getCurrentCargoPlacement],
  (deckMap, currentCargoPlacement) =>
    deckMap[currentCargoPlacement?.deckId]?.lanes.find(
      (lane) => lane.id === currentCargoPlacement?.laneId
    ) ?? laneFactory()
);
// export const getCargoPlacementsForLane = (laneId: string) =>
//   createSelector(getCargoPlacements, (cargoPlacements) =>
//     cargoPlacements.filter((cp) => cp.laneId === laneId)
//   );

// export const getOverflowingCargoPlacementsIntoLane = (laneId: string) =>
//   createSelector(getCargoPlacements, (cargoPlacements) =>
//     cargoPlacements.filter((cp) => cp.overflowingLaneId === laneId)
//   );

export const getCargoPlacementByRegistrationNumber = (input: string) =>
  createSelector(getCargoPlacements, (cargoPlacements) =>
    cargoPlacements.find(
      (cp: CargoPlacement) =>
        cp.cargo.registrationNumber.replace(/\s/g, "") ===
        input.replace(/\s/g, "")
    )
  );

export const getFrameIdFromPosition = (deckId: string, pos: number) =>
  createSelector(
    [getDeckMap],
    (deckMap) =>
      deckMap[deckId]?.frames.find((frame) => frame.distance >= pos)?.id
  );

export const getLaneNameFromPlacement = (cargoPlacement: CargoPlacement) =>
  createSelector(
    [getDeckMap],
    (deckMap) =>
      deckMap[cargoPlacement?.deckId]?.lanes.find(
        (lane) => lane.id === cargoPlacement?.laneId
      )?.name
  );
