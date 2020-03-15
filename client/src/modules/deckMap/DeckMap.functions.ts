import { arrayMax, arrayMin } from "../../shared/functions/math";
import { DECK_MAP } from "../../shared/constants";
import { Deck } from "../../types";

export const getViewBoxOriginX = (currentDeck: Deck): number => {
    return arrayMin(currentDeck.lanes.map(lane => lane.LCG - lane.length / 2)) * DECK_MAP.X_SCALE - DECK_MAP.X_MARGIN;
}

export const getViewBoxOriginY = (currentDeck: Deck): number => {
    return arrayMin(currentDeck.lanes.map(lane => lane.TCG - lane.width / 2)) * DECK_MAP.Y_SCALE - DECK_MAP.Y_MARGIN / 2;
}

export const getViewBoxSizeX = (currentDeck: Deck): number => {
    let xMax = arrayMax(currentDeck.lanes.map(lane => lane.LCG + lane.length / 2));
    let xMin = arrayMin(currentDeck.lanes.map(lane => lane.LCG - lane.length / 2));
    return xMax - xMin + DECK_MAP.X_MARGIN + 2 * DECK_MAP.LANE_BUTTON_WIDTH;
}

export const getViewBoxSizeY = (currentDeck: Deck): number => {
    let yMax = arrayMax(currentDeck.lanes.map(lane => lane.TCG + lane.width / 2));
    let yMin = arrayMin(currentDeck.lanes.map(lane => lane.TCG - lane.width / 2));
    return yMax - yMin + DECK_MAP.Y_MARGIN;
}