import { createSelector } from "reselect";

const getCurrentDeckId = (state: { deckMapReducer: any }) =>
  state.deckMapReducer.currentDeckId;
const getDeckMap = (state: { deckMapReducer: any }) =>
  state.deckMapReducer.deckMap;

export const getCurrentDeck = createSelector(
  [getCurrentDeckId, getDeckMap],
  (currentDeckId, deckMap) => deckMap[currentDeckId]
);
