import { ACTION_TYPES } from '../../shared/constants'
import { Cargo, Deck } from '../../types';

export const setCurrentCargo = (cargo: Cargo) => {
    return {
        type: ACTION_TYPES.SET_CURRENT_CARGO,
        payload: cargo
    }
};

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

const appActions = {
    setCurrentCargo,
    setCurrentDeck,
    setDeckMap
};

export default appActions;