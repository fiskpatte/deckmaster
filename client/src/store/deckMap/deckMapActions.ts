import { Cargo, DeckMapType } from "../../types/deckMap";
import { Placement } from "../../types/util";
import { DECK_MAP_ACTION_TYPES } from "./deckMapActionTypes";

export const setCurrentCargo = (cargo: Cargo) => {
  return {
    type: DECK_MAP_ACTION_TYPES.SET_CURRENT_CARGO,
    payload: cargo,
  };
};

export const setCurrentPlacement = (placement: Placement | null) => {
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
  payload: cargoPlacements
})

// export const setCargoInDeckMap =

const deckMapActions = {
  setCurrentCargo,
  setCurrentPlacement,
  setDeckMap,
  setCurrentDeckId,
  addCargoPlacement,
  setCargoPlacements,
};

export default deckMapActions;
