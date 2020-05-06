import { ACTION_TYPES } from "../../constants";
import { DeckMapType } from "../../types/deckMap";
import { Settings } from "../../types/settings";
import { SessionData } from './../../types/sessionData';

export const setDeckMap = (deckMap: DeckMapType) => {
  return {
    type: ACTION_TYPES.SET_DECK_MAP,
    payload: deckMap,
  };
};

export const setCurrentDeckId = (deckId: string) => {
  return {
    type: ACTION_TYPES.SET_CURRENT_DECK_ID,
    payload: deckId,
  };
};

export const setSettings = (settings: Settings) => {
  return {
    type: ACTION_TYPES.SET_SETTINGS,
    payload: settings,
  };
};

export const addCargoPlacement = (cargoPlacement: any) => ({
  type: ACTION_TYPES.ADD_CARGO_PLACEMENT,
  payload: cargoPlacement,
});

export const setSessionData = (data: SessionData | undefined) => ({
  type: ACTION_TYPES.SET_SESSION_DATA,
  payload: data,
});

const appActions = {
  setCurrentDeckId,
  setDeckMap,
  addCargoPlacement,
  setSessionData
};

export default appActions;
