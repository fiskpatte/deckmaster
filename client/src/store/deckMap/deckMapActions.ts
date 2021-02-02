import { DeckMapType, SuggestedCargoPlacement } from "../../types/deckMap";
import { DECK_MAP_ACTION_TYPES } from "./deckMapActionTypes";
import { CargoPlacement } from "./../../types/deckMap";

export const setCurrentPlacement = (placement: CargoPlacement) => {
  return {
    type: DECK_MAP_ACTION_TYPES.SET_CURRENT_PLACEMENT,
    payload: placement,
  };
};

export const setDeckMap = (deckMap: DeckMapType) => {
  return {
    type: DECK_MAP_ACTION_TYPES.SET_DECK_MAP,
    payload: deckMap,
  };
};

export const setCurrentDeckId = (deckId: string) => {
  return {
    type: DECK_MAP_ACTION_TYPES.SET_CURRENT_DECK_ID,
    payload: deckId,
  };
};

export const addCargoPlacement = (cargoPlacement: any) => ({
  type: DECK_MAP_ACTION_TYPES.ADD_CARGO_PLACEMENT,
  payload: cargoPlacement,
});

export const setCargoPlacements = (cargoPlacements: any) => ({
  type: DECK_MAP_ACTION_TYPES.SET_CARGO_PLACEMENTS,
  payload: cargoPlacements,
});

export const removeCargoPlacement = (
  cargoPlacementId: string,
  deckId: string,
  laneId: string
) => ({
  type: DECK_MAP_ACTION_TYPES.REMOVE_CARGO_PLACEMENT,
  payload: {
    cargoPlacementId,
    deckId,
    laneId,
  },
});

export const setSuggestedCargoPlacement = (
  suggestedCargoPlacement?: SuggestedCargoPlacement
) => ({
  type: DECK_MAP_ACTION_TYPES.SET_SUGGESTED_CARGO_PLACEMENT,
  payload: suggestedCargoPlacement,
});

// export const setCargoInDeckMap =

const deckMapActions = {
  setCurrentPlacement,
  setDeckMap,
  setCurrentDeckId,
  addCargoPlacement,
  setCargoPlacements,
  removeCargoPlacement,
  setSuggestedCargoPlacement,
};

export default deckMapActions;
