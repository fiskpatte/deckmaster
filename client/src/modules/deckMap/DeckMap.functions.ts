import { arrayMax, arrayMin } from "../../functions/math";
import { DECK_MAP } from "../../constants";
import { Deck } from "../../types/deckMap";
import { DeckMapType } from "../../types/deckMap";
import { getDeckMapElementEdges } from "../../functions/deckMap";

export const getViewBoxOriginX = (currentDeck: Deck): number => {
  return (
    arrayMin(
      currentDeck.lanes.map((lane) => getDeckMapElementEdges(lane).aft)
    ) *
    DECK_MAP.X_SCALE -
    DECK_MAP.X_MARGIN
  );
};

export const getViewBoxOriginY = (currentDeck: Deck): number => {
  return (
    arrayMin(currentDeck.lanes.map((lane) => getDeckMapElementEdges(lane).left)) *
    DECK_MAP.Y_SCALE -
    DECK_MAP.Y_MARGIN / 2
  );
};

export const getViewBoxSizeX = (currentDeck: Deck): number => {
  let xMax = arrayMax(
    currentDeck.lanes.map((lane) => getDeckMapElementEdges(lane).fwd)
  );
  let xMin = arrayMin(
    currentDeck.lanes.map((lane) => getDeckMapElementEdges(lane).aft)
  );
  return xMax - xMin + DECK_MAP.X_MARGIN + 2 * DECK_MAP.LANE_BUTTON_WIDTH;
};

export const getViewBoxSizeY = (currentDeck: Deck): number => {
  let yMax = arrayMax(
    currentDeck.lanes.map((lane) => getDeckMapElementEdges(lane).right)
  );
  let yMin = arrayMin(
    currentDeck.lanes.map((lane) => getDeckMapElementEdges(lane).left)
  );
  return yMax - yMin + DECK_MAP.Y_MARGIN;
};

export const getRulerOrigin = (currentDeck: Deck): number => {
  return (
    arrayMax(currentDeck.lanes.map((lane) => getDeckMapElementEdges(lane).right)) + 0.5
  );
};

export const getDeckNames = (deckMap: DeckMapType) =>
  Object.keys(deckMap).sort(
    (key1, key2) => deckMap[key1].sortOrder - deckMap[key2].sortOrder
  );
