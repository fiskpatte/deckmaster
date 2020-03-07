import { ACTION_TYPES } from '../../shared/constants'

export const setCurrentCargo = (cargo) => {
    return {
        type: ACTION_TYPES.SET_CURRENT_CARGO,
        payload: cargo
    }
};

export const setDeckMap = (deckMap) => {
    return {
        type: ACTION_TYPES.SET_DECK_MAP,
        payload: deckMap
    }
};

export const setCurrentDeck = (deck) => {
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