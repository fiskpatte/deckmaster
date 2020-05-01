import { createSelector } from "reselect";

const getCurrentDeckId = (state: { appReducer: any }) =>
  state.appReducer.currentDeckId;
const getDeckMap = (state: { appReducer: any }) => state.appReducer.deckMap;

export const getCurrentDeck = createSelector(
  [getCurrentDeckId, getDeckMap],
  (currentDeckId, deckMap) => {
    console.log("deckmap: ", deckMap);
    console.log("currentDeckId: ", currentDeckId);

    const result = deckMap[currentDeckId];
    console.log("result: ", result);
    return result;
  }
);
