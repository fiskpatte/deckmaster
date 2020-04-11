import { ACTION_TYPES } from "../../constants";
import { Deck, DeckMapType } from "../../types/deckMap";
import { Settings } from "../../types/settings";

export const setDeckMap = (deckMap: DeckMapType) => {
  return {
    type: ACTION_TYPES.SET_DECK_MAP,
    payload: deckMap,
  };
};

export const setCurrentDeck = (deck: Deck) => {
  return {
    type: ACTION_TYPES.SET_CURRENT_DECK,
    payload: deck,
  };
};

export const setSettings = (settings: Settings) => {
  return {
    type: ACTION_TYPES.SET_SETTINGS,
    payload: settings,
  };
};

const appActions = {
  setCurrentDeck,
  setDeckMap,
};

export default appActions;
