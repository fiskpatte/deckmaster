import { ACTION_TYPES } from '../../shared/constants'
import { AppState } from '../store.types';
import { deckFactory } from '../../shared/types/deckMap';

const initialState: AppState = {
    deckMap: {},
    currentDeck: deckFactory(),
}
const appReducer = (state = initialState, action: any): AppState => {
    switch (action.type) {
        case ACTION_TYPES.SET_DECK_MAP:
            return {
                ...state,
                deckMap: action.payload
            };
        case ACTION_TYPES.SET_CURRENT_DECK:
            return {
                ...state,
                currentDeck: action.payload
            };
        default:
            return state;
    }
}

export default appReducer;