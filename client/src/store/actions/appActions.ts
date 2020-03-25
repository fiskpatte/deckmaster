import { ACTION_TYPES } from '../../shared/constants'
import {  Deck } from '../../shared/types/deckMap';
import { Coords } from '../../shared/types/util';

export const setDeckMap = (deckMap: Array<Deck>) => {
    return {
        type: ACTION_TYPES.SET_DECK_MAP,
        payload: deckMap
    }
};

export const setCurrentDeck = (deck: Deck) => {
    return {
        type: ACTION_TYPES.SET_CURRENT_DECK,
        payload: deck
    }
};

export const setCurrentPosition = (position: Coords | null) => {
    return {
        type: ACTION_TYPES.SET_CURRENT_POSITION,
        payload: position
    }
}

const appActions = {
    setCurrentDeck,
    setDeckMap,
    setCurrentPosition
};

export default appActions;