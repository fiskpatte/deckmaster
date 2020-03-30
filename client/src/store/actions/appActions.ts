import { ACTION_TYPES } from '../../shared/constants'
import { Deck, DeckMapType } from '../../shared/types/deckMap';

export const setDeckMap = (deckMap: DeckMapType) => {
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
    setCurrentDeck,
    setDeckMap,
};

export default appActions;