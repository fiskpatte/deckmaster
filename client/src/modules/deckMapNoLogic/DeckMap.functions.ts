import { arrayMax, arrayMin } from "../../functions/math";
import { DECK_MAP } from "../../constants";
import { Deck, DeckMapElement } from "../../types/deckMap";
import { DeckMapType } from "./../../types/deckMap";

export const getViewBoxOriginX = (currentDeck: Deck): number => {
  return (
    arrayMin(
      currentDeck.lanes.map((lane) => getEndpoints(lane).aft)
    ) *
    DECK_MAP.X_SCALE -
    DECK_MAP.X_MARGIN
  );
};

export const getViewBoxOriginY = (currentDeck: Deck): number => {
  return (
    arrayMin(currentDeck.lanes.map((lane) => getEndpoints(lane).left)) *
    DECK_MAP.Y_SCALE -
    DECK_MAP.Y_MARGIN / 2
  );
};

export const getViewBoxSizeX = (currentDeck: Deck): number => {
  let xMax = arrayMax(
    currentDeck.lanes.map((lane) => getEndpoints(lane).fwd)
  );
  let xMin = arrayMin(
    currentDeck.lanes.map((lane) => getEndpoints(lane).aft)
  );
  return xMax - xMin + DECK_MAP.X_MARGIN + 2 * DECK_MAP.LANE_BUTTON_WIDTH;
};

export const getViewBoxSizeY = (currentDeck: Deck): number => {
  let yMax = arrayMax(
    currentDeck.lanes.map((lane) => getEndpoints(lane).right)
  );
  let yMin = arrayMin(
    currentDeck.lanes.map((lane) => getEndpoints(lane).left)
  );
  return yMax - yMin + DECK_MAP.Y_MARGIN;
};

export const getRulerOrigin = (currentDeck: Deck): number => {
  return (
    arrayMax(currentDeck.lanes.map((lane) => getEndpoints(lane).right)) + 0.5
  );
};

export const getDeckNames = (deckMap: DeckMapType) =>
  Object.keys(deckMap).sort(
    (key1, key2) => deckMap[key1].sortOrder - deckMap[key2].sortOrder
  );

const getEndpoints = (elem: DeckMapElement) => {
  const left = elem.TCG - elem.width / 2;
  const right = left + elem.width;
  const aft = elem.LCG - elem.length / 2;
  const fwd = aft + elem.length;

  return { left, right, aft, fwd };
};